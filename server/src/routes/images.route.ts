import { Router } from 'express';
import { ImagesController } from '@/controllers/images.controller';
import { authValidate } from '@/middlewares/auth.middleware';
import { UserRole } from '@/interfaces/IUser.interface';
import { checkRole } from '@/middlewares/checkRole';
import upload from '@/middlewares/storage';

export class ImagesRoute {
  public path = '/images';
  public router = Router();
  private controller: ImagesController;

  constructor() {
    this.controller = new ImagesController();
    this.init();
  }

  private init() {
    this.router.get('/', authValidate, this.controller.getAllImages);
    this.router.get('/:id', authValidate, this.controller.getImages);
    this.router.post('/create', authValidate, upload.single('image'), this.controller.createImages);
    this.router.delete('/:id', authValidate, checkRole(UserRole.admin), this.controller.deleteImages);
    this.router.patch('/:id', authValidate, checkRole(UserRole.admin), this.controller.updateImages);
  }
}
