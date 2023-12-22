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

    findAll(serviceParam?: { limit?: number; searchTerm?: string }): Promise<Journalist[]> {
        const queryOptions: FindManyOptions<Journalist> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                name: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        return this.journalistRepository.find(queryOptions);
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