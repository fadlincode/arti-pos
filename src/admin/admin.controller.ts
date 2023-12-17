import { Controller, Get, Render } from "@nestjs/common";

@Controller('/admin')
export class AdminController {
    @Get('/')
    @Render('features/admin/dashboard')
    index() {
        const data = {
            title: 'Admin Panel',
        }

        return {
            data: data,
        }
    }
}