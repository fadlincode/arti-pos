import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Keyword } from "./keyword.entity";
import { Repository } from "typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class KeywordService {
    constructor(
        @InjectRepository(Keyword)
        private keywordRepository: Repository<Keyword>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<Keyword>> {
        const queryBuilder = this.keywordRepository.createQueryBuilder();
        
        if (serviceParam?.searchTerm) {
            queryBuilder.where('keyword.word LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        return paginate<Keyword>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
        });
    }

    findOne(id: number): Promise<Keyword | null> {
        return this.keywordRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.keywordRepository.delete(id);
    }
}