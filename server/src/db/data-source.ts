import { DataSource } from "typeorm";
import { env } from "../../config/env";
import { Event } from "./entities/event.entities";
import { User } from "./entities/user.entities";
import { EventParticipant } from "./entities/event-paticipant.entities";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: env.databaseUrl,
    synchronize: false,
    logging: true,
    entities: [Event, User, EventParticipant],
    migrations: ['src/db/migrations/**/*.ts'],
    subscribers: [],
    logger: "advanced-console",
});
