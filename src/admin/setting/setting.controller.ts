import { Body, Controller, Get, Param, Post, Query, Redirect, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SettingService } from './setting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { stat, unlink } from 'fs/promises';

@Controller('/admin/settings')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @Get('/:id')
    @Render('features/admin/setting')
    async edit(@Param('id') id: number) {
        const data = {
            title: 'Edit Setting',
            setting: await this.settingService.findOne(id)
        }

        return {
            data: data
        }
    }

    @Post('/:id/update')
    @UseInterceptors(FileInterceptor('app_logo', {dest: './public/uploads/setting'}))
    @Redirect('/admin/settings/1')
    async update(
        @Body() body,
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: number,
    ) {
        const setting = await this.settingService.findOne(id);

        setting.setAppName(body.app_name);
        setting.setAppDescription(body.app_description);

        if (file) {
            const filePath = join('./public/uploads/setting/', setting.app_logo || '');
            const fileCheck = await stat(filePath);
            if (fileCheck.isFile()) {
                await unlink(filePath);
            }
            
            setting.setAppLogo(file.filename);
        }

        await this.settingService.createOrUpdate(setting);
    }
}
