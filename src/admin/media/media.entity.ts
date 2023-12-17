import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medias' })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  url: string;

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
}
