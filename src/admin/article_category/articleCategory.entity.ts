import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import { Category } from '../category/category.entity';

@Entity({ name: 'article_categories' })
export class ArticleCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'article_id' })
    articleId: number

    @Column({ name:'category_id' })
    categoryId: number

    @ManyToOne(() => Article)
    @JoinColumn({ name: 'article_id' })
    article: Article;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    getId(): number {
        return this.id;
    }
}
