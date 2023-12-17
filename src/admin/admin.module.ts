import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { LanguageController } from "./language/language.controller";
import { LanguageService } from "./language/language.service";
import { MediaController } from "./media/media.controller";
import { JournalistController } from "./journalist/journalist.controller";

@Module({
    controllers: [
        AdminController,
        LanguageController,
        MediaController,
        JournalistController
    ]
})
export class AdminModule {}