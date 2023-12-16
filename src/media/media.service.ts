import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
  }

  findOne(id: number): Promise<Media | null> {
    return this.mediaRepository.findOneBy({ id });
  }
}
