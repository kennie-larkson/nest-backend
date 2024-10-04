import {
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
} from '@dataui/crud';
import { BaseCrudService } from './base-crud.service';

export abstract class BaseCrudController<T> implements CrudController<T> {
  constructor(public readonly service: BaseCrudService<T>) {}

  /* async getMany(req: CrudRequest): Promise<GetManyDefaultResponse<T> | T[]> {
    return this.service.getMany(req);
  }

  async getOne(req: CrudRequest): Promise<T> {
    return this.service.getOne(req);
  } */

  /* async createOne(req: CrudRequest, dto: T): Promise<T> {
    
    return this.service.createOne(req, dto);
  } */

  /* async updateOne(req: CrudRequest, dto: Partial<T>): Promise<T> {
    return this.service.updateOne(req, dto);
  }

  async deleteOne(req: CrudRequest): Promise<void | T> {
    return this.service.deleteOne(req);
  } */
}
