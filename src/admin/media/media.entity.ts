import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity({ name: 'medias' })
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({ nullable: true, type: 'longtext' })
    logo?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @OneToMany(() => Article, (article) => article.media)
    articles: Article[]

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getLogo(): string {
        return this.logo;
    }

    getUrl(): string {
        return this.url;
    }

    setName(name: string) {
        this.name = name;
    }

    setLogo(logo: string) {
        this.logo = logo;
    }

    setUrl(url: string) {
        this.url = url;
    }

    getArticles(): Article[] {
        return this.articles;
    }

    setArticles(articles: Article[]) {
        this.articles = articles;
    }

    

}
