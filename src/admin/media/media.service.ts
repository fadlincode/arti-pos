import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) {}

    findAll(limit: number, searchTerm: string): Promise<Media[]> {
        return this.mediaRepository.find({
            take: limit,
            where: {
                name: Like(`%${searchTerm}%`),
            },
        });
    }

    findOne(id: number): Promise<Media | null> {
        return this.mediaRepository.findOneBy({ id });
    }

    findCount(): Promise<number> {
        return this.mediaRepository.count();
    }
    
    createOrUpdate(media: Media): Promise<Media> {
        return this.mediaRepository.save(media);
    }

    async remove(id: number): Promise<void> {
        await this.mediaRepository.delete(id);
    }
}
