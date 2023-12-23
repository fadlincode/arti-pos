import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleService } from './admin/article/article.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly articleService: ArticleService
  ) {}

  // @Get('/')
  // @Render('features/home/index')
  // async index() {
  //   const serviceParam = {
  //     options: {
  //       limit: 10,
  //     }
  //   }

  //   const data = {
  //     title: 'Index',
  //     content: 'This is content',
  //     articles: {
  //       trendings: await this.articleService.findAll(serviceParam),
  //     }
  //   };

  //   return {
  //     data: data,
  //   };
  // }

  // @Get('/read/:slug')
  // @Render('features/home/detail')
  // async detail(@Param('slug') slug: string) {
  //   const serviceParam = {
  //     limit: 10
  //   }
  //   await this.articleService.updateViewCount(slug);

  //   const data = {
  //     title: 'Detail Berita',
  //     article: await this.articleService.findBySlug(slug),
  //     trendings: await this.articleService.findAll(serviceParam),
  //   };

  //   return {
  //     data: data
  //   }
  // }

  // @Get('/page/:category')
  // @Render('features/home/page')
  // async page(@Param('category') category: string) {
  //   const serviceParam = {
  //     limit: 10
  //   }

  //   const data = {
  //     title: category.toUpperCase(),
  //     articles: await this.articleService.findAll(serviceParam)
  //   };

  //   return {
  //     data: data
  //   }
  // }

  // @Post('/updatelikes')
  // async updateLikes(@Body() body) {
  //   await this.articleService.updateLikeCount(body.id);

  //   const article = await this.articleService.findOne(body.id);
  //   return {
  //     article: article
  //   }
  // }
}
