import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { LanguageController } from "./language/language.controller";
import { MediaController } from "./media/media.controller";
import { JournalistController } from "./journalist/journalist.controller";
import { CategoryController } from "./category/category.controller";
import { UserController } from "./user/user.controller";

@Module({
    controllers: [
        AdminController,
        LanguageController,
        MediaController,
        JournalistController,
        CategoryController,
        UserController
    ]
})
export class AdminModule {}