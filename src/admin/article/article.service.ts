import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll(): Promise<Article[]> {
        return this.articleRepository.find();
    }

    findOne(id: number): Promise<Article | null> {
        return this.articleRepository.findOneBy({ id });
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
