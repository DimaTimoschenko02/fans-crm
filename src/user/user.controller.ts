import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  public async addUser(@Body() user: any) {
    return this.userService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  public async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('sign-up')
  public async signUp(@Body() { user }: SignUpDto) {
    return this.userService.createUser(user);
  }
}
