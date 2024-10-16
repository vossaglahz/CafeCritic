import { Router } from 'express';
import { PlaceController } from '@/controllers/place.controller';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole';
import { UserRole } from '@/interfaces/IUser.interface';
import upload from '@/middlewares/storage';

export class PlaceRoute {
  public path = '/places';
  public router = Router();
  private controller: PlaceController;

  constructor() {
    this.controller = new PlaceController();
    this.init();
  }

  private init() {
    this.router.get('/', authValidate, this.controller.getAllPlaces);
    this.router.get('/:id', authValidate, this.controller.getPlace);
    this.router.post('/create', authValidate, upload.single('image'), this.controller.createPlace);
    this.router.delete('/:id', authValidate, checkRole(UserRole.admin), this.controller.deletePlace);
    this.router.patch('/:id', authValidate, checkRole(UserRole.admin), this.controller.updatePlace);
  }
}
