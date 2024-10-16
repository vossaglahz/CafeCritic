import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import MainSeeder from "./database/seeds/main.seeds";
import { Review} from "./entities/review.entity";
import { User } from "./entities/user.entity";
import { Place } from "./entities/place.entity";
import { Images } from "./entities/images.entity";

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "M2Z0h0E2!",
    database: "exam12",
    synchronize: true,
    entities: [User, Place, Review, Images],
    driver: require('mysql2'),
    factories: [],
    seeds: [MainSeeder]
}

export const AppDataSource = new DataSource(options)
