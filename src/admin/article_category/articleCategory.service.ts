import { Injectable } from "@nestjs/common";
import { ArticleCategory } from "./articleCategory.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class ArticleCategoryService {
    constructor(
        @InjectRepository(ArticleCategory)
        private articleRepository: Repository<ArticleCategory>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; }, categoryId?: number): Promise<Pagination<ArticleCategory>> {
        const queryBuilder = this.articleRepository.createQueryBuilder('article_category');
        
        queryBuilder.where('article_category.category_id = :category_id', { category_id: categoryId })
                    .orderBy("article.date", "DESC")
                    .leftJoinAndSelect('article_category.category', 'category')
                    .leftJoinAndSelect('article_category.article', 'article')
                    .leftJoinAndSelect('article.media', 'media')
                    .leftJoinAndSelect('article.journalist', 'journalist');

        return paginate<ArticleCategory>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
        });
    }
}