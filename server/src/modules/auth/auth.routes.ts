import { FastifyPluginAsync } from "fastify";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../db/entities/user.entities";
import { loginSchema, registerSchema } from "./auth.schema";
import argon2 from "argon2";


export const authRoutes: FastifyPluginAsync = async (app) => {
    const userRepository = AppDataSource.getRepository(User)

    app.post('/register', async (request, reply) => {
        const parsedBody = registerSchema.safeParse(request.body);

        if (!parsedBody.success) {
            return reply.code(400).send({
                message: 'Invalid request body',
                error: parsedBody.error.issues.map(issue => ({
                    path: issue.path,
                    message: issue.message
                }))
            });
        }
        const { email, password, name } = parsedBody.data
        const existingUser = await userRepository.findOne({ where: { email } });

        if (existingUser) {
            return reply.code(409).send({ message: 'User already exists' });
        }

        const hashedPassword = await argon2.hash(password);
        const user = userRepository.create({
            email,
            passwordHash: hashedPassword,
            name
        });
        const seaveUser = await userRepository.save(user);
        const token = await reply.jwtSign({ sub: seaveUser.id, email: seaveUser.email })
        return reply.code(201).send({
            token,
            user: {
                id: seaveUser.id,
                email: seaveUser.email,
                name: seaveUser.name,
            }
        });



    })
    app.post('/login', async (request, reply) => {
        const parsedBody = loginSchema.safeParse(request.body);

        if (!parsedBody.success) {
            return reply.code(400).send({
                message: 'Invalid request body',
                error: parsedBody.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        const { email, password } = parsedBody.data;
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await argon2.verify(user.passwordHash, password);
        if (!isPasswordValid) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }
        const token = await reply.jwtSign({ sub: user.id, email: user.email })
        return reply.code(201).send({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        });

    })

    app.get('/me', { preHandler: [app.authenticate] }, async (request, reply) => {
        const userId = request.user.sub
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return reply.code(404).send({ message: 'User not found' });
        }
        return reply.code(201).send({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    })
}