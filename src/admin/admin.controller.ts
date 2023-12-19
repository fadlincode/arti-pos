import { Controller, Get, Render } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { MediaService } from "./media/media.service";
import { JournalistService } from "./journalist/journalist.service";
import { ArticleService } from "./article/article.service";

@Controller('/admin')
export class AdminController {
    constructor(
        private readonly userService: UserService,
        private readonly mediaService: MediaService,
        private readonly journalistService: JournalistService,
        private readonly articleService: ArticleService,

    ) {}


    @Get('/')
    @Render('features/admin/dashboard')
    async index() {
        const data = {
            title: 'Admin Panel',
            number: {
                user: await this.userService.findCount(),
                media: await this.mediaService.findCount(),
                journalist: await this.journalistService.findCount(),
                article: await this.articleService.findCount()
            }
        }

        return {
            data: data,
        }
    }
}