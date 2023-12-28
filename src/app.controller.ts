import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleService } from './admin/article/article.service';
import { CategoryService } from './admin/category/category.service';
import { ArticleCategoryService } from './admin/article_category/articleCategory.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly articleService: ArticleService,
        private readonly categoryService: CategoryService,
        private readonly articleCategoryService: ArticleCategoryService

    ) {}

    @Get('/')
    @Render('features/home/index')
    async index() {
        const serviceParam = {
            options: {
                page: 1,
                limit: 9,
                route: ''
            }
        }

        const data = {
            title: 'Index',
            content: 'This is content',
            articles: {
                trendings: await this.articleService.findAll(serviceParam),
            }
        };

        return {
            data: data,
        };
    }

    @Get('/read/:slug')
    @Render('features/home/detail')
    async detail(@Param('slug') slug: string) {
        const serviceParam = {
            options: {
                page: 1,
                limit: 9,
                route: ''
            }
        }

        await this.articleService.updateViewCount(slug);

        const data = {
            title: 'Detail Berita',
            article: await this.articleService.findBySlug(slug),
            trendings: await this.articleService.findAll(serviceParam),
        };

        return {
            data: data
        }
    }

    @Get('/page/:category')
    @Render('features/home/page')
    async page(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Param('category') category: string
    ) {
        
        const getCategory = await this.categoryService.findByName(category);
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 10,
                route: '/page/' + category + '/',
            },
            categoryId: getCategory.getId()
        }

        const data = {
            title: category.toUpperCase(),
            // articles: await this.articleService.findAll(serviceParam),
            articles: await this.articleCategoryService.findAll(serviceParam)
        };

        return {
            data: data
        }
    }

    @Get('/search/')
    @Render('features/home/search')
    async search(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 10,
                route: '/search' + (searchTerm ? '?searchTerm=' + searchTerm : '')
            },
            searchTerm: searchTerm || ''
        }

        const data = {
            title: "Cari Artikel",
            articles: await this.articleService.findAll(serviceParam),
            searchTerm: searchTerm
        };

        return {
            data: data
        }
    }

    @Post('/updatelikes')
    async updateLikes(@Body() body) {
        await this.articleService.updateLikeCount(body.id);

        const article = await this.articleService.findOne(body.id);
        return {
            article: article
        }
    }
}
