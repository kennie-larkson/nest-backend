import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interfaces/user.interface';
import { NoAuthNeeded } from './../auth/decorators/public.decorator';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}
  // @UseInterceptors(CacheInterceptor)
  // @NoAuthNeeded()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }
  // @HttpCode(HttpStatus.FOUND)
  // @NoAuthNeeded()
  // @Get('by-email/:email')
  // findByEmail(@Param('email') email: string) {
  //   return this.userService.findByEmail(email);
  // }
  // @UseInterceptors(CacheInterceptor)
  // @NoAuthNeeded()
  @Get()
  async findAll(): Promise<User[]> {
    console.log('This method was called');
    return this.userService.findAll();
  }
  // @Get('both/:id')
  // findBoth(@Param('id') id: string, @Query('name') name: string) {
  //   const users = this.userService.findAll();
  //   return ` ${users}: ${id}`;
  // }
  // @Patch(':email')
  // update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(email, updateUserDto);
  // }
  // @Delete(':email')
  // remove(@Param('email') email: string) {
  //   return this.userService.remove(email);
  // }
}
