import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Redirect, Render } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from './media.entity';

@Controller('/admin/medias')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get('/')
    @Render('features/admin/media/index')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 10,
                route: '/admin/medias' + (searchTerm ? '?searchTerm=' + searchTerm : '')
            },

            searchTerm: searchTerm || ''
        }

        const data = {
            title: 'Media',
            medias: await this.mediaService.findAll(serviceParam),
            searchTerm: searchTerm
        }

        return {
            data: data
        }
    }

    @Post('/store')
    @Redirect('/admin/medias')
    async store(@Body() body) {
        const media = new Media();

        media.setName(body.name);
        media.setUrl(body.url);
        media.setLogo(body.logo);
        await this.mediaService.createOrUpdate(media);
    }

    @Get('/:id')
    @Render('features/admin/media/edit')
    async edit(@Param('id') id: number) {
        const data = {
            title: 'Edit Media',
            media: await this.mediaService.findOne(id)
        }

        return {
            data: data
        }
    }

    @Post('/:id/update')
    @Redirect('/admin/medias')
    async update(
        @Body() body,
        @Param('id') id: number,
    ) {
        const media = await this.mediaService.findOne(id);

        media.setName(body.name);
        media.setUrl(body.url);
        media.setLogo(body.logo);
        await this.mediaService.createOrUpdate(media);
    }

    @Post('/:id')
    @Redirect('/admin/medias')
    remove(@Param('id') id: number) {
        return this.mediaService.remove(id);
    }
}
