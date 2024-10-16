import { Review } from '@/entities/review.entity';
import { ReviewDto } from '@/dto/review.dto';
import { Repository } from 'typeorm';
import { AppDataSource } from '@/appDataSource';
import { placeRepo } from './place.repository';

class ReviewRepo {
  private repo: Repository<Review>;

  constructor() {
    this.repo = AppDataSource.getRepository(Review);
  }

  async create(body: ReviewDto) {
    if (!body.placeId) {
      throw new Error('Place ID is required');
    }
  
    const place = await placeRepo.getOne(parseInt(body.placeId));
    if (!place) {
      throw new Error('Place Not Found.');
    }
  
    return await this.repo.save({ ...body, place: place });
  }
  

  async getAll(placeId?: number) {
    const queryBuilder = this.repo.createQueryBuilder("review").leftJoinAndSelect("review.place", "place");
    if (placeId) {
      queryBuilder.where("place.id = :placeId", { placeId });
    }
    return await queryBuilder.getMany();
  }

  async getOne(id: number) {
    return await this.repo.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(review: Review): Promise<Review> {
    return await this.repo.save(review);
  }
}

export const reviewRepo = new ReviewRepo();
