"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = require("@fastify/jwt");
const cors_1 = __importDefault(require("@fastify/cors"));
require("dotenv/config");
require("reflect-metadata");
const env_1 = require("../config/env");
const data_source_1 = require("./db/data-source");
const auth_routes_1 = require("./modules/auth/auth.routes");
const events_routes_1 = require("./modules/events/events.routes");
const app = (0, fastify_1.default)({ logger: true });
app.decorate('authenticate', async function authenticate(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (error) {
        reply.code(401).send({ message: 'Unauthorized' });
    }
});
const start = async () => {
    try {
        (0, env_1.validateEnv)();
        await app.register(cors_1.default, {
            origin: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        });
        await app.register(jwt_1.fastifyJwt, {
            secret: env_1.env.jwtSecret,
        });
        await app.register(auth_routes_1.authRoutes, { prefix: '/auth' });
        await app.register(events_routes_1.eventRoutes, { prefix: '/events' });
        await data_source_1.AppDataSource.initialize();
        app.log.info('Database connected');
        app.listen({ port: Number(env_1.env.port || 3000), host: env_1.env.host });
        app.log.info(`Server is running on ${env_1.env.host}:${env_1.env.port}`);
    }
    catch (error) {
        if (data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.destroy();
        }
        app.log.error(error);
        process.exit(1);
    }
};
start();
