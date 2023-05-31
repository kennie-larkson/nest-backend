import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHome() {
    return 'This is the AuthService';
  }
}
