import { Observable } from 'rxjs';
import { SafeType, UserModel } from './interfaces';


export abstract class User<T extends UserModel = UserModel> extends Observable<T> {
  abstract login(username: string, password: string, extra?: SafeType): void;
  abstract logout(): void;
}
