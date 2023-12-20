import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('/admin/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    @Render('features/admin/user/index')
    async index(
        @Query('limit') limit: number,
        @Query('searchTerm') searchTerm: string
    ) {
        limit = limit || 10;
        searchTerm = searchTerm || '';

        const data = {
            title: 'User',
            users: await this.userService.findAll(limit, searchTerm),
            searchTerm: searchTerm
        }

        return {
            data: data
        }
    }

    @Post('/store')
    @Redirect('/admin/users')
    async store(@Body() body) {
        const user = new User();

        user.setName(body.name);
        user.setEmail(body.email);
        user.setPassword(body.password);
        await this.userService.createOrUpdate(user);
    }

    @Get('/:id')
    @Render('features/admin/user/edit')
    async edit(@Param('id') id: number) {
        const data = {
            title: 'Edit User',
            user: await this.userService.findOne(id)
        }

        return {
            data: data
        }
    }

    @Post('/:id/update')
    @Redirect('/admin/users')
    async update(
        @Body() body,
        @Param('id') id: number,
    ) {
        const user = await this.userService.findOne(id);

        user.setName(body.name);
        user.setEmail(body.email);
        if (body.password !== "") {
            const hash = await bcrypt.hash(user.getPassword(), 10);
            user.setPassword(hash);    
        }
        await this.userService.createOrUpdate(user);
    }

    @Post('/:id')
    @Redirect('/admin/users')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
