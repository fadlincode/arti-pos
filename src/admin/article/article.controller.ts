import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('/admin/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('/')
    @Render('features/admin/article/index')
    async index(
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        limit = limit || 10;
        searchTerm = searchTerm || '';

        const data = {
            title: 'Article',
            articles: await this.articleService.findAll(limit, searchTerm),
            searchTerm: searchTerm
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
