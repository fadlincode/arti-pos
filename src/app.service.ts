import { Injectable } from '@nestjs/common';
import { ArticleService } from './admin/article/article.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
