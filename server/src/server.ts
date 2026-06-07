import fastify from "fastify";
import { fastifyJwt } from "@fastify/jwt";
import cors from "@fastify/cors";
import "dotenv/config";
import "reflect-metadata";
import { validateEnv, env } from "../config/env";
import { AppDataSource } from "./db/data-source";
import { authRoutes } from "./modules/auth/auth.routes";
import { eventRoutes } from "./modules/events/events.routes";
import { meRoutes } from "./modules/me/me.routes";

const app = fastify({ logger: true });

app.decorate('authenticate', async function authenticate(request, reply) {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.code(401).send({ message: 'Unauthorized' });
    }
});
const start = async () => {
    try {
        validateEnv()
        await app.register(cors, {
            origin: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })

        await app.register(fastifyJwt, {
            secret: env.jwtSecret,
        })
        await app.register(authRoutes, { prefix: '/auth' })
        await app.register(eventRoutes, { prefix: '/events' })
        await app.register(meRoutes, { prefix: '/me' })

        await AppDataSource.initialize()
        app.log.info('Database connected');
        app.listen({ port: Number(env.port || 3000), host: env.host });
        app.log.info(`Server is running on ${env.host}:${env.port}`);
    } catch (error) {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
        app.log.error(error);
        process.exit(1);
    }
};

start();