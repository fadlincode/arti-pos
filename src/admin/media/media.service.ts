import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) {}
    
    async findAll(serviceParam?: { options? : IPaginationOptions; searchTerm?: string }): Promise<Pagination<Media>> {
        const queryBuilder = this.mediaRepository.createQueryBuilder();
        
        if (serviceParam?.searchTerm) {
            queryBuilder.where('media.name LIKE :searchTerm', { searchTerm: `%${serviceParam.searchTerm}%` });
        }

        return paginate<Media>(queryBuilder, {
            limit: serviceParam?.options?.limit,
            page: serviceParam?.options?.page,
            route: serviceParam?.options?.route,
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
