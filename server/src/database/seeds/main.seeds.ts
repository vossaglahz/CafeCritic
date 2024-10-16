import { User } from "@/entities/user.entity";
import { Place } from "@/entities/place.entity";
import { Review } from "@/entities/review.entity";
import { Images } from "@/entities/images.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userFactory = factoryManager.get(User);
        const placeFactory = factoryManager.get(Place);
        const reviewFactory = factoryManager.get(Review);
        const imagesFactory = factoryManager.get(Images);

        const userData = [
            { role: 'user', image: "00608102-3049-48fb-b6f2-29a91badc664.jpg" },
            { role: 'admin', image: "ca96e814-9fd3-4e72-8d95-755f9560ec12.jpg" }
        ];

        let allUser: User[] = [];

        for (const user of userData) {
            const newUser = await userFactory.save({
                role: user.role,
                image: user.image,
            });
            allUser.push(newUser);
        }

        let allPlace: Place[] = [];
        for (const user of allUser) {
            const newPlace = await placeFactory.save({ user });
            allPlace.push(newPlace);
        }

        let allReview: Review[] = [];
        for (const place of allPlace) {
            const newReview = await reviewFactory.save({ place });
            allReview.push(newReview);
        }

        for (const place of allPlace) {
            await imagesFactory.save({ place });
        }
    }
}

