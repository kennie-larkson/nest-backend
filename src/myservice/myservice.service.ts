import { Injectable } from '@nestjs/common';

@Injectable()
export class MyserviceService {
  callMyService() {
    return 'This is MyService service';
  }
}
