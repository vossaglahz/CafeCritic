import { Router } from 'express';
import { ReviewController } from '@/controllers/review.controller';
import { authValidate } from '@/middlewares/auth.middleware';
import { UserRole } from '@/interfaces/IUser.interface';
import { checkRole } from '@/middlewares/checkRole';

export class ReviewRoute {
  public path = '/reviews';
  public router = Router();
  private controller: ReviewController;

  constructor() {
    this.controller = new ReviewController();
    this.init();
  }

  private init() {
    this.router.get('/', authValidate, this.controller.getAllReviews);
    this.router.get('/:id', authValidate, this.controller.getReview);
    this.router.post('/create', authValidate, this.controller.createReview);
    this.router.delete('/:id', authValidate, checkRole(UserRole.admin), this.controller.deleteReview);
    this.router.patch('/:id', authValidate, checkRole(UserRole.admin), this.controller.updateReview);
  }
}
