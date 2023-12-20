import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from '../media/media.entity';
import { Language } from '../language/language.entity';
import { Journalist } from '../journalist/journalist.entity';

@Entity({ name: 'articles' })
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    url: string;

    @Column()
    title_original: string;

    @Column({ nullable: true })
    title_eng?: string;

    @Column({ nullable: true, type: 'text' })
    summary_original?: string;

    @Column({ nullable: true, type: 'text' })
    summary_eng?: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true, type: 'text' })
    openai_summary?: string;

    @Column({ nullable: true, type: 'text' })
    image?: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @Column({ name:'media_id' })
    mediaId: number

    @Column({ name:'language_id' })
    languageId: number

    @Column({ name:'journalist_id' })
    journalistId: number

    @ManyToOne(() => Media)
    @JoinColumn({ name: 'media_id' })
    media: Media;

    @ManyToOne(() => Language)
    @JoinColumn({ name: 'language_id' })
    language: Language;

    @ManyToOne(() => Journalist)
    @JoinColumn({ name: 'journalist_id' })
    journalist: Journalist;

    getId(): number {
        return this.id;
    }

    getSlug(): string {
        return this.slug;
    }

    getUrl(): string {
        return this.url;
    }

    getTitle(): string {
        return this.title_original;
    }

    getTitleEng(): string {
        return this.title_eng;
    }

    getSummaryOriginal(): string {
        return this.summary_original;
    }

    getSummaryEng(): string {
        return this.summary_eng;
    }

    getContent(): string {
        return this.content;
    }

    getOpenAiSummary(): string {
        return this.openai_summary;
    }

    getImage(): string {
        return this.image;
    }

    getDate(): Date {
        return this.date;
    }
}
