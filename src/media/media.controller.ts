import { Controller, Get, Render } from "@nestjs/common";
import { MediaService } from "./media.service";

@Controller('/media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get('/')
    @Render('features/media/index')
    async index() {
        const data = {
            title: "List Media",
            medias: await this.mediaService.findAll()
        };

        return {
            data: data
        }
    }
}