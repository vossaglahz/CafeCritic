import { ReviewDto } from '@/dto/review.dto';
import { reviewRepo } from '@/repositories/review.repository';
import { Review } from '@/entities/review.entity';
import { validate } from 'class-validator';

export class ReviewService {
  getAllReviews = async (placeId?: string): Promise<Review[]> => {
    const placeIdNumber = placeId ? parseInt(placeId) : undefined;
    return await reviewRepo.getAll(placeIdNumber);
  };

  getReview = async (id: string): Promise<Review | null> => {
    return await reviewRepo.getOne(parseInt(id));
  };

  createReview = async (data: ReviewDto): Promise<Review> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;
    return await reviewRepo.create(data);
  };

  deleteReview = async (id: string): Promise<void> => {
    const review = await reviewRepo.getOne(parseInt(id));
    if (!review) throw new Error('Review not found');
    await reviewRepo.delete(parseInt(id));
  };

  updateReview = async (id: string, data: ReviewDto): Promise<Review> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;

    const review = await reviewRepo.getOne(parseInt(id));
    if (!review) throw new Error('Review not found');

    Object.assign(review, data);
    return await reviewRepo.save(review);
  };
}
