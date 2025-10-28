import { IBaseRepo } from '@shared-base-lib';
import { User } from '../domain';

export const USER_REPO = 'USER_REPO';

export interface IUserRepo extends IBaseRepo<User, string> {
  getUserByEmail(email: string): Promise<User>;
}
