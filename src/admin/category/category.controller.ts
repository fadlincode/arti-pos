import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Redirect, Render } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('/admin/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('/')
    @Render('features/admin/category/index')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 5,
                route: '/admin/categories' + (searchTerm ? '?searchTerm=' + searchTerm : '')
            },
            searchTerm: searchTerm || ''
        }

        const data = {
            title: 'Category',
            categories: await this.categoryService.findAll(serviceParam),
            searchTerm: searchTerm
        }

        return {
            data: data
        }
    }

    @Post('/store')
    @Redirect('/admin/categories')
    async store(@Body() body) {
        const category = new Category();

        category.setName(body.name);
        await this.categoryService.createOrUpdate(category);
    }

    @Get('/:id')
    @Render('features/admin/category/edit')
    async edit(@Param('id') id: number) {
        const data = {
            title: 'Edit Category',
            category: await this.categoryService.findOne(id)
        }

        return {
            data: data
        }
    }

    @Post('/:id/update')
    @Redirect('/admin/categories')
    async update(
        @Body() body,
        @Param('id') id: number,
    ) {
        const category = await this.categoryService.findOne(id);

        category.setName(body.name);
        await this.categoryService.createOrUpdate(category);
    }

    @Post('/:id')
    @Redirect('/admin/categories')
    remove(@Param('id') id: number) {
        return this.categoryService.remove(id);
    }
}
