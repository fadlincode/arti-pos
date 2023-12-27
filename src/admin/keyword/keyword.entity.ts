import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'keywords' })
export class Keyword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    getId(): number {
        return this.id;
    }

    getWord(): string {
        return this.word;
    }
}