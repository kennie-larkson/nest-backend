import { LoginResponse } from '../../user/dto/create-user.dto';
export interface IAuthService {
    signIn(email: string, password: string): Promise<LoginResponse>;
}
