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
} from '@nestjs/common';
import { UserService } from './user.service';
import { MyserviceService } from './../myservice/myservice.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interfaces/user.interface';
import { NoAuthNeeded } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private myService: MyserviceService,
  ) {}

  @NoAuthNeeded()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.FOUND)
  @NoAuthNeeded()
  @Get('by-email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @NoAuthNeeded()
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('both/:id')
  findBoth(@Param('id') id: string, @Query('name') name: string) {
    const myServ = this.myService.callMyService();
    const users = this.userService.findAll();

    return `${myServ} and ${users}: ${id}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.userService.remove(+id);
  }
}
