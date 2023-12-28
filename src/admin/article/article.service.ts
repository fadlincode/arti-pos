import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './article.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<Article>> {
        const queryBuilder = this.articleRepository.createQueryBuilder('article');

        if (serviceParam?.searchTerm) {
            queryBuilder.where('article.title_original LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        queryBuilder
            .orderBy("article.date", "DESC")
            .leftJoinAndSelect('article.media', 'media')
            .leftJoinAndSelect('article.language', 'language')
            .leftJoinAndSelect('article.journalist', 'journalist');

        return paginate<Article>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
        });
    }

    findOne(id: number): Promise<Article | null> {
        return this.articleRepository.findOneBy({ id });
    }

    findBySlug(slug: string): Promise<Article[]> {
        return this.articleRepository.find({
            take: 1,
            where: {
                slug: Like(`%${slug}%`),
            },
            relations: ['media','language','journalist']
        });
    }

    findCount(): Promise<number> {
        return this.articleRepository.count();
    }
    
    createOrUpdate(article: Article): Promise<Article> {
        return this.articleRepository.save(article);
    }

    async remove(id: number): Promise<void> {
        await this.articleRepository.delete(id);
    }

    async updateViewCount(slug: string): Promise<void> {
        const article = await this.findBySlug(slug);
        article[0].view_count++;
        await this.articleRepository.save(article);
    }

    async updateLikeCount(id: number): Promise<void> {
        const article = await this.findOne(id);
        article.like_count++;
        await this.articleRepository.save(article);
    }
}
