import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(serviceParam?: { limit?: number; searchTerm?: string }): Promise<User[]> {
        const queryOptions: FindManyOptions<User> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                name: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        return this.userRepository.find(queryOptions);
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    findCount(): Promise<number> {
        return this.userRepository.count();
    }
    
    async createOrUpdate(user: User): Promise<User> {
        if (user.password === "") {
            delete user.password;    
        }
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
