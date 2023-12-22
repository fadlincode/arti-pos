import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Journalist } from "./journalist.entity";
import { FindManyOptions, Like, Repository } from "typeorm";
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class JournalistService {
    constructor(
        @InjectRepository(Journalist)
        private journalistRepository: Repository<Journalist>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<Journalist>> {
        const queryOptions: FindManyOptions<Journalist> = {};

        if (serviceParam?.options?.limit !== undefined) {
            queryOptions.take = Number(serviceParam.options.limit);
        }
        
        const queryBuilder = this.journalistRepository.createQueryBuilder();

        if (serviceParam?.searchTerm) {
            queryBuilder.where('journalist.name LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        return paginate<Journalist>(queryBuilder, {
            limit: queryOptions.take,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
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