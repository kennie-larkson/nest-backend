import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CreatedUser } from '../user/dto/create-user.dto';

export abstract class BaseCrudService<
  CreatedUser,
> extends TypeOrmCrudService<CreatedUser> {
  constructor(protected readonly repository: Repository<CreatedUser>) {
    super(repository);
  }
}
