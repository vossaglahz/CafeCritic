import { Place } from '@/entities/place.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const PlaceFactory = setSeederFactory(Place, (faker: Faker) => {
    const place = new Place()
    place.title = faker.commerce.department();
    place.published = true;
    place.description = faker.lorem.lines(1);
    return place
})