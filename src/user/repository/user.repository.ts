import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseCrudService } from '../../common/base-crud.service';
import { CrudRequest } from '@dataui/crud';
import { CreatedUser } from '../dto/create-user.dto';
import { AuthTokenService } from '../../utilities/generate-token';

@Injectable()
export class UserRepository extends BaseCrudService<User> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    private readonly authTokenService: AuthTokenService,
  ) {
    super(userRepo);
  }
}
