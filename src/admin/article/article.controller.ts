import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Redirect, Render } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('/admin/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('/')
    @Render('features/admin/article/index')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 10,
                route: '/admin/articles' + (searchTerm ? '?searchTerm=' + searchTerm : '')
            },
            searchTerm: searchTerm || ''
        }

        const data = {
            title: 'Article',
            articles: await this.articleService.findAll(serviceParam),
            searchTerm: searchTerm,
            page: page
        }

        return {
            data: data
        }
    }

    @Post('/:id')
    @Redirect('/admin/articles')
    remove(@Param('id') id: number) {
        return this.articleService.remove(id);
    }
}
