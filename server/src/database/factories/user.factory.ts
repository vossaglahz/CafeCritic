import { User } from "@/entities/user.entity";
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.displayName = faker.internet.displayName();
    user.password = 'test';
    user.email = faker.internet.email();
    user.image = user.image;
    await user.hashPassword();
    user.generateToken();
    user.role = user.role || 'user';
    return user;
});
