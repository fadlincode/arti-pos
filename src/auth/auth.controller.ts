import { Body, Controller, Get, Post, Redirect, Render, Req, Res } from "@nestjs/common";
import { UserService } from "src/admin/user/user.service";

@Controller('/auth')
export class AuthController {
    constructor(private readonly userServide: UserService) {}

    @Get('/login')
    @Render('features/auth/login')
    login() {
        const data = {
            title: 'Login'
        };

        return {
            data: data,
        };
    }

    @Post('/connect')
    async connect(
        @Body() body, 
        @Req() request,
        @Res() response
    ) {

        const email = body.email;
        const pass = body.password;
        const user = await this.userServide.login(email, pass);

        if (user) {
            request.session.user = {
                id: user.id,
                name: user.name,
            };
            return response.redirect('/admin');
        } else {
            return response.redirect('/auth/login');
        }
    }

    @Get('/logout')
    @Redirect('/')
    logout(@Req() request) {
        request.session.user = null;
    }
}