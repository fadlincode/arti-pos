import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('features/home/index')
  index() {
    const data = {
      title: 'Index',
      content: 'This is content',
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
