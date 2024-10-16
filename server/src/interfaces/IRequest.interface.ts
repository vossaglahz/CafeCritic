import { Request } from 'express';
import { IUser } from './IUser.interface';

export interface RequestWithUser extends Request {
  user?: IUser;
}