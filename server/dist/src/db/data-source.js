"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("../../config/env");
const event_entities_1 = require("./entities/event.entities");
const user_entities_1 = require("./entities/user.entities");
const event_paticipant_entities_1 = require("./entities/event-paticipant.entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: env_1.env.databaseUrl,
    synchronize: false,
    logging: true,
    entities: [event_entities_1.Event, user_entities_1.User, event_paticipant_entities_1.EventParticipant],
    migrations: ['src/db/migrations/**/*.ts'],
    subscribers: [],
    logger: "advanced-console",
});
