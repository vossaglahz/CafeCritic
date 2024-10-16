import { Place } from '@/entities/place.entity';
import { PlaceDto } from '@/dto/place.dto';
import { Repository } from 'typeorm';
import { AppDataSource } from '@/appDataSource';

class PlaceRepo {
  private repo: Repository<Place>;

  constructor() {
    this.repo = AppDataSource.getRepository(Place);
  }

  async create(body: PlaceDto) {
    return await this.repo.save(body);
  }

  async getAll() {
    return await this.repo.find();
  }

  async getOne(id: number) {
    return await this.repo.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(place: Place): Promise<Place> {
    return await this.repo.save(place);
  }
}

export const placeRepo = new PlaceRepo();
