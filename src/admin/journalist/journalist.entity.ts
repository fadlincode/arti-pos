import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'journalists' })
export class Journalist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    photo?: string

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