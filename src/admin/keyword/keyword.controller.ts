import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Redirect, Render } from "@nestjs/common";
import { KeywordService } from "./keyword.service";
import { Keyword } from "./keyword.entity";

@Controller('/admin/keywords')
export class KeywordController {
    constructor(private readonly keywordService: KeywordService) {}

    @Get('/')
    @Render('features/admin/keyword/index')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        const serviceParam = {
            options: {
                page: page,
                limit: limit || 10,
                route: '/admin/keywords' + (searchTerm ? '?searchTerm=' + searchTerm : '')
            },
            searchTerm: searchTerm || ''
        }

        const data = {
            title: 'Keyword',
            keywords: await this.keywordService.findAll(serviceParam),
            searchTerm: searchTerm
        }

        return {
            data: data
        }
    }
}