import { CreateUser } from '../../user/interfaces/user.interface';
import { CreatedUser, LoginResponse } from '../../user/dto/create-user.dto';

export interface IAuthService {
  //signUp(payload: CreateUser): Promise<CreatedUser>;
  signIn(email: string, password: string): Promise<LoginResponse>;
}
