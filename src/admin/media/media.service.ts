import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) {}

    findAll(serviceParam?: { limit?: number; searchTerm?: string }): Promise<Media[]> {
        const queryOptions: FindManyOptions<Media> = {}

        if (serviceParam && serviceParam.limit !== undefined) {
            queryOptions.take = serviceParam.limit;
        }

        if (serviceParam && serviceParam.searchTerm) {
            queryOptions.where = {
                name: Like(`%${serviceParam.searchTerm}%`),
            }
        }

        return this.mediaRepository.find(queryOptions);
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
