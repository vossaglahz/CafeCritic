import { PlaceDto } from '@/dto/place.dto';
import { placeRepo } from '@/repositories/place.repository';
import { Place } from '@/entities/place.entity';
import { validate } from 'class-validator';

export class PlaceService {
  getAllPlaces = async (): Promise<Place[]> => {
    return await placeRepo.getAll();
  };

  getPlace = async (id: string): Promise<Place | null> => {
    return await placeRepo.getOne(parseInt(id));
  };

  createPlace = async (data: PlaceDto): Promise<Place> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;
    return await placeRepo.create(data);
  };

  deletePlace = async (id: string): Promise<void> => {
    const place = await placeRepo.getOne(parseInt(id));
    if (!place) throw new Error('Place not found');
    await placeRepo.delete(parseInt(id));
  };

  updatePlace = async (id: string, data: PlaceDto): Promise<Place> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;

    const place = await placeRepo.getOne(parseInt(id));
    if (!place) throw new Error('Place not found');

    Object.assign(place, data);
    return await placeRepo.save(place);
  };
}