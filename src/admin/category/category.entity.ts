import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleCategory } from '../article_category/articleCategory.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ArticleCategory, (articleCategory) => articleCategory.category)
  articleCategory: ArticleCategory[]

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }
}
