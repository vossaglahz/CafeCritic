import { ImagesDto } from '@/dto/images.dto';
import { imagesRepo } from '@/repositories/images.repository';
import { Images } from '@/entities/images.entity';
import { validate } from 'class-validator';

export class ImagesService {
  getAllImages = async (placeId?: string): Promise<Images[]> => {
    const placeIdNumber = placeId ? parseInt(placeId) : undefined;
    return await imagesRepo.getAll(placeIdNumber);
  };

  getImages = async (id: string): Promise<Images | null> => {
    return await imagesRepo.getOne(parseInt(id));
  };

  createImages = async (data: ImagesDto): Promise<Images> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;
    return await imagesRepo.create(data);
  };

  deleteImages = async (id: string): Promise<void> => {
    const images = await imagesRepo.getOne(parseInt(id));
    if (!images) throw new Error('Images not found');
    await imagesRepo.delete(parseInt(id));
  };

  updateImages = async (id: string, data: ImagesDto): Promise<Images> => {
    const errors = await validate(data, { whitelist: true });
    if (errors.length) throw errors;

    const images = await imagesRepo.getOne(parseInt(id));
    if (!images) throw new Error('Images not found');

    Object.assign(images, data);
    return await imagesRepo.save(images);
  };
}
