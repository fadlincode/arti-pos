import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "./language.entity";
import { FindManyOptions, Like, Repository } from "typeorm";

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
    ) {}

    findAll(serviceParam?: { limit?: number; searchTerm?: string }): Promise<Language[]> {
        const queryOptions: FindManyOptions<Language> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                name: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        return this.languageRepository.find(queryOptions);
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