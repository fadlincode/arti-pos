import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { LanguageController } from "./language/language.controller";
import { MediaController } from "./media/media.controller";
import { JournalistController } from "./journalist/journalist.controller";
import { CategoryController } from "./category/category.controller";
import { UserController } from "./user/user.controller";
import { ArticleController } from "./article/article.controller";
import { SettingController } from "./setting/setting.controller";
import { KeywordController } from "./keyword/keyword.controller";

@Module({
    controllers: [
        AdminController,
        LanguageController,
        MediaController,
        JournalistController,
        CategoryController,
        UserController,
        ArticleController,
        SettingController,
        KeywordController
    ]
})
export class AdminModule {}