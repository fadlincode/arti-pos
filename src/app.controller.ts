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

  @Get('/berita/:slug')
  detail(@Param() params, @Res() response) {
    const data = {
      title: 'Detail Berita',
    };

    return response.render('features/home/detail', {
      data: data
    })
    
  }
}
