import { Images } from '@/entities/images.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const ImagesFactory = setSeederFactory(Images, (faker: Faker) => {
    const images = new Images()
    images.imageName = images.imageName;
    return images
})