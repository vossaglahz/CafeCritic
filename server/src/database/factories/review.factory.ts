import { Review } from '@/entities/review.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const ReviewFactory = setSeederFactory(Review, (faker: Faker) => {
    const review = new Review()
    review.text = faker.lorem.lines(1);
    review.datetime = faker.date.anytime().toISOString();
    review.ratingFood = faker.number.int({min: 1, max: 5})
    review.ratingQuality = faker.number.int({min: 1, max: 5})
    review.ratingInterior = faker.number.int({min: 1, max: 5})
    return review
})