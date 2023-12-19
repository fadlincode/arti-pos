import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MediaController } from './admin/media/media.controller';
import { Media } from './admin/media/media.entity';
import { MediaService } from './admin/media/media.service';
import { AdminModule } from './admin/admin.module';
import { Language } from './admin/language/language.entity';
import { LanguageService } from './admin/language/language.service';
import { JournalistService } from './admin/journalist/journalist.service';
import { Journalist } from './admin/journalist/journalist.entity';
import { Category } from './admin/category/category.entity';
import { CategoryService } from './admin/category/category.service';
import { User } from './admin/user/user.entity';
import { UserService } from './admin/user/user.service';
import { Article } from './admin/article/article.entity';
import { ArticleService } from './admin/article/article.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Media,
      Language,
      Journalist,
      Category,
      User,
      Article
    ]),
    AdminModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    LanguageService, 
    MediaService, 
    JournalistService, 
    CategoryService, 
    UserService,
    ArticleService
  ],
  exports: [
    LanguageService,
    MediaService,
    JournalistService,
    CategoryService,
    UserService,
    ArticleService
  ]
})
export class AppModule {}
