import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<User>> {
        const queryBuilder = this.userRepository.createQueryBuilder();
        
        if (serviceParam?.searchTerm) {
            queryBuilder.where('user.name LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        return paginate<User>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
        });
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

    async login(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.getPassword());
            if (isMatch) {
                return user;
            }
        }
        return null;
    }
}
