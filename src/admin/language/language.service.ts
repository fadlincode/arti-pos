import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "./language.entity";
import { FindManyOptions, Like, Repository } from "typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<Language>> {
        const queryBuilder = this.languageRepository.createQueryBuilder();
        if (serviceParam?.options?.limit !== undefined) {
            queryBuilder.take(Number(serviceParam?.options?.limit))
        }

        if (serviceParam?.searchTerm) {
            queryBuilder.where('language.name LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        return paginate<Language>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
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