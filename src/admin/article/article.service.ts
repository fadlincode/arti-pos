import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll(serviceParam?: { limit?: number; searchTerm?: string; }): Promise<Article[]> {
        const queryOptions: FindManyOptions<Article> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                title_original: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        queryOptions.relations = ['media','language','journalist'];

        return this.articleRepository.find(queryOptions);
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
