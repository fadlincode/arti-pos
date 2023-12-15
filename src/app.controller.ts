import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render('index')
  index() {
    const data = {
      title: "Index",
      content: "This is content"
    }

    return {
      data: data
    }
  }
}
