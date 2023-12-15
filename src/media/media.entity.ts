import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}