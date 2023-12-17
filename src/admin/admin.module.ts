import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { LanguageController } from "./language/language.controller";
import { LanguageService } from "./language/language.service";

@Module({
    controllers: [
        AdminController,
        LanguageController
    ]
})
export class AdminModule {}