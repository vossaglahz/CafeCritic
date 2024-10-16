import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { UserController } from '@/controllers/user.controller';
import upload from '@/middlewares/storage';

export class UserRoute implements IRoute {
  public path = '/users';
  public router = Router();
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.init();
  }

  private init() {
    this.router.post('/registration', upload.single('image'), this.controller.registration);
    this.router.post('/signIn', this.controller.signIn);
    this.router.get('/validateToken', this.controller.validateToken);
    this.router.get('/logout', this.controller.logout);
  }
}
