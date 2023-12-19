import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from '../media/media.entity';

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

    @Column()
    content: string;

    @Column()
    image: string;

    @Column()
    date: string;

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

    getContent(): string {
        return this.content;
    }

    getDate(): string {
        return this.date;
    }

    getImage(): string {
        return this.image;
    }

    getMedia(): Media {
        return this.media;
    }

    setMedia(media: Media) {
        return this.media = media;
    }

    @ManyToOne(() => Media, (media) => media.articles)
    media: Media;
  
}
