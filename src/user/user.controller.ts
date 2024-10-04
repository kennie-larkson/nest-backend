import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Crud, CrudController } from '@dataui/crud';
import { NoAuthNeeded } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@Crud({
  model: { type: User },
  routes: { only: ['getManyBase'] },
})
@Controller('user')
//@NoAuthNeeded()
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Post(':id/profile-picture')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('got here');
    return this.service.uploadProfilePicture(userId, file);
  }
}
