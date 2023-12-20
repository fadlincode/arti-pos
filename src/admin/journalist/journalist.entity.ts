import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../article/article.entity";

@Entity({ name: 'journalists' })
export class Journalist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    photo?: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @OneToMany(() => Article, article => article.journalist)
    articles: Article[]

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPhoto(): string {
        return this.photo;
    }

    setName(name: string) {
        this.name = name;
    }

    setPhoto(photo: string) {
        this.photo = photo;
    }
}