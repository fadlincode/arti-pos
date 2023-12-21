import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleService } from './admin/article/article.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly articleService: ArticleService
  ) {}

  @Get('/')
  @Render('features/home/index')
  async index() {
    const data = {
      title: 'Index',
      content: 'This is content',
      articles: {
        trendings: await this.articleService.findAll(9, ''),
      }
    };

    return {
      data: data,
    };
  }

  @Get('/read/:slug')
  @Render('features/home/detail')
  async detail(@Param('slug') slug: string) {

    const data = {
      title: 'Detail Berita',
      article: await this.articleService.findBySlug(slug),
      trendings: await this.articleService.findAll(9, ''),
    };

    return {
      data: data
    }
    
  }
}
