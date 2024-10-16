import { RequestHandler } from 'express';
import { ReviewService } from '@/services/review.service';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from '@/dto/review.dto';
import { formatErrors } from '@/helpers/formatErrors';

export class ReviewController {
  private service: ReviewService;

  constructor() {
    this.service = new ReviewService();
  }

  getAllReviews: RequestHandler = async (req, res): Promise<void> => {
    const placeId = req.query.placeId as string;
    const reviews = await this.service.getAllReviews(placeId);
    res.send(reviews);
  };

  getReview: RequestHandler = async (req, res): Promise<void> => {
    const review = await this.service.getReview(req.params.id);
    res.send(review);
  };

  createReview: RequestHandler = async (req, res): Promise<void> => {
    try {
      const reviewDto = plainToInstance(ReviewDto, req.body);
      const review = await this.service.createReview(reviewDto);
      res.send(review);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };

  deleteReview: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deleteReview(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  updateReview: RequestHandler = async (req, res): Promise<void> => {
    try {
      const reviewDto = plainToInstance(ReviewDto, req.body);
      const updatedReview = await this.service.updateReview(req.params.id, reviewDto);
      res.send(updatedReview);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };
}
