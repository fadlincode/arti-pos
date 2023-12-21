import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';

@Injectable()
export class SettingService {
    constructor(
        @InjectRepository(Setting)
        private settingRepository: Repository<Setting>,
    ) {}

    findOne(id: number): Promise<Setting | null> {
        return this.settingRepository.findOneBy({ id });
    }
    
    createOrUpdate(setting: Setting): Promise<Setting> {
        return this.settingRepository.save(setting);
    }
}
