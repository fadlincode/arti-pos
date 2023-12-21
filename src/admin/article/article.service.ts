import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll(limit: number, searchTerm: string): Promise<Article[]> {
        return this.articleRepository.find({
            take: limit,
            where: {
                title_original: Like(`%${searchTerm}%`),
            },
            relations: ['media','language','journalist']
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
}
