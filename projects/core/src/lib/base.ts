import { SafeType } from './interfaces';


export abstract class User {
  abstract login(username: string, password: string, extra: SafeType): void;
  abstract logout(): void;
}
