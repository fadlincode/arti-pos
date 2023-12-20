import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(limit: number, searchTerm: string): Promise<User[]> {
        return this.userRepository.find({
            take: limit,
            where: {
                name: Like(`%${searchTerm}%`),
            },
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
}
