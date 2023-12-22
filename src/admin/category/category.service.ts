import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    findAll(serviceParam?: { limit?: number; searchTerm?: string }): Promise<Category[]> {
        const queryOptions: FindManyOptions<Category> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                name: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        return this.categoryRepository.find(queryOptions);
    }

    findOne(id: number): Promise<Category | null> {
        return this.categoryRepository.findOneBy({ id });
    }
    
    createOrUpdate(category: Category): Promise<Category> {
        return this.categoryRepository.save(category);
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
