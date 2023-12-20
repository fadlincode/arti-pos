import { Body, Controller, Get, Param, Post, Query, Redirect, Render, UploadedFile, UseInterceptors } from "@nestjs/common";
import { JournalistService } from "./journalist.service";
import { Journalist } from "./journalist.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { unlink } from "fs/promises";
import { join } from "path";

@Controller('/admin/journalists')
export class JournalistController {
    constructor(private readonly journalistService: JournalistService) {}

    @Get('/')
    @Render('features/admin/journalist/index')
    async index(
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        limit = limit || 10;
        searchTerm = searchTerm || '';

        const data = {
            title: 'Journalist',
            journalists: await this.journalistService.findAll(limit, searchTerm),
            searchTerm: searchTerm
        }

        return {
            data: data
        }
    }

    @Post('/store')
    @UseInterceptors(FileInterceptor('photo', {dest: './public/uploads/journalist'}))
    @Redirect('/admin/journalists')
    async store(
        @Body() body,
        @UploadedFile() file: Express.Multer.File
    ) {
        const journalist = new Journalist();

        journalist.setName(body.name);
        if (file) {
            journalist.setPhoto(file.filename);
        }
        await this.journalistService.createOrUpdate(journalist);
    }

    @Get('/:id')
    @Render('features/admin/journalist/edit')
    async edit(@Param('id') id: number) {
        const data = {
            title: 'Edit Journalist',
            journalist: await this.journalistService.findOne(id)
        }

        return {
            data: data
        }
    }

    @Post('/:id/update')
    @UseInterceptors(FileInterceptor('photo', {dest: './public/uploads/journalist'}))
    @Redirect('/admin/journalists')
    async update(
        @Body() body,
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: number,
    ) {
        const journalist = await this.journalistService.findOne(id);

        journalist.setName(body.name);
        if (file) {
            const filePath = join('./public/uploads/journalist/', journalist.photo);
            if (filePath) {
                await unlink(filePath);
            }
            
            journalist.setPhoto(file.filename);
        }
        await this.journalistService.createOrUpdate(journalist);
    }

    @Post('/:id')
    @Redirect('/admin/journalists')
    async remove(@Param('id') id: number) {
        const journalist = await this.journalistService.findOne(id);
        const filePath = join('./public/uploads/journalist/', journalist.photo);

        if (filePath) {
            await unlink(filePath);
        }
        
        return this.journalistService.remove(id);
    }

}