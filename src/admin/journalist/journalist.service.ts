import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Journalist } from "./journalist.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class JournalistService {
    constructor(
        @InjectRepository(Journalist)
        private journalistRepository: Repository<Journalist>,
    ) {}

    findAll(limit: number, searchTerm: string): Promise<Journalist[]> {
        return this.journalistRepository.find({
            take: limit,
            where: {
                name: Like(`%${searchTerm}%`),
            },
        });
    }

    findOne(id: number): Promise<Journalist | null> {
        return this.journalistRepository.findOneBy({ id });
    }

    findCount(): Promise<number> {
        return this.journalistRepository.count();
    }

    createOrUpdate(journalist: Journalist): Promise<Journalist> {
        return this.journalistRepository.save(journalist);
    }

    async remove(id: number): Promise<void> {
        await this.journalistRepository.delete(id);
    }
}