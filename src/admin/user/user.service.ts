import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }
    
    async createOrUpdate(user: User): Promise<User> {
        if (user.password != "") {
            const hash = await bcrypt.hash(user.getPassword(), 10);
            user.setPassword(hash);    
        }
        
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
