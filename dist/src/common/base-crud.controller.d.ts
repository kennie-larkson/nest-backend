import { CrudController } from '@dataui/crud';
import { BaseCrudService } from './base-crud.service';
export declare abstract class BaseCrudController<T> implements CrudController<T> {
    readonly service: BaseCrudService<T>;
    constructor(service: BaseCrudService<T>);
}
