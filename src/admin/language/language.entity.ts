import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'languages' })
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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