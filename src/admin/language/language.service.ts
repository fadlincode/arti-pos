import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "./language.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
    ) {}

    findAll(limit, searchTerm): Promise<Language[]> {
        return this.languageRepository.find({
            take: limit,
            where: {
                name: Like(`%${searchTerm}%`),
            }
        });
    }

    findOne(id: number): Promise<Language | null> {
        return this.languageRepository.findOneBy({ id });
    }

    createOrUpdate(language: Language): Promise<Language> {
        return this.languageRepository.save(language);
    }

    async remove(id: number): Promise<void> {
        await this.languageRepository.delete(id);
    }
}