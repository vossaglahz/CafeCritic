import { runSeeders } from "typeorm-extension";
import { AppDataSource } from "@/appDataSource";

AppDataSource.initialize().then(async () => {
    await AppDataSource.synchronize(true)
    await runSeeders(AppDataSource)
    process.exit()
})