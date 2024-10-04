import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
export declare abstract class BaseCrudService<CreatedUser> extends TypeOrmCrudService<CreatedUser> {
    protected readonly repository: Repository<CreatedUser>;
    constructor(repository: Repository<CreatedUser>);
}
