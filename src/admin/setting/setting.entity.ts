import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'settings' })
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    app_name: string;

    @Column({ nullable: true, type: 'text' })
    app_description: string;

    @Column({ nullable: true, type: 'text' })
    app_logo?: string;

    getId(): number {
        return this.id;
    }

    getAppName(): string {
        return this.app_name;
    }

    getAppDescription(): string {
        return this.app_description;
    }

    getAppLogo(): string {
        return this.app_logo;
    }

    setAppName(app_name: string) {
        this.app_name = app_name;
    }

    setAppDescription(app_description: string) {
        this.app_description = app_description;
    }

    setAppLogo(app_logo: string) {
        this.app_logo = app_logo;
    }
}
