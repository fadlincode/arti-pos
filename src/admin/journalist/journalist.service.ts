import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Journalist } from "./journalist.entity";
import { Repository } from "typeorm";

@Injectable()
export class JournalistService {
    constructor(
        @InjectRepository(Journalist)
        private journalistRepository: Repository<Journalist>,
    ) {}

    findAll(): Promise<Journalist[]> {
        return this.journalistRepository.find();
    }

    findOne(id: number): Promise<Journalist | null> {
        return this.journalistRepository.findOneBy({ id });
    }

    createOrUpdate(journalist: Journalist): Promise<Journalist> {
        return this.journalistRepository.save(journalist);
    }

    async remove(id: number): Promise<void> {
        await this.journalistRepository.delete(id);
    }
}