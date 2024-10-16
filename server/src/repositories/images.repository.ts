import { Images } from '@/entities/images.entity';
import { ImagesDto } from '@/dto/images.dto';
import { Repository } from 'typeorm';
import { AppDataSource } from '@/appDataSource';
import { placeRepo } from './place.repository';

class ImagesRepo {
  private repo: Repository<Images>;

  constructor() {
    this.repo = AppDataSource.getRepository(Images);
  }

  async create(body: ImagesDto) {
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
    const queryBuilder = this.repo.createQueryBuilder("images").leftJoinAndSelect("images.place", "place");
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

  async save(images: Images): Promise<Images> {
    return await this.repo.save(images);
  }
}

export const imagesRepo = new ImagesRepo();
