"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const data_source_1 = require("../../db/data-source");
const user_entities_1 = require("../../db/entities/user.entities");
const auth_schema_1 = require("./auth.schema");
const argon2_1 = __importDefault(require("argon2"));
const authRoutes = async (app) => {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entities_1.User);
    app.post('/register', async (request, reply) => {
        const parsedBody = auth_schema_1.registerSchema.safeParse(request.body);
        if (!parsedBody.success) {
            return reply.code(400).send({
                message: 'Invalid request body',
                error: parsedBody.error.issues.map(issue => ({
                    path: issue.path,
                    message: issue.message
                }))
            });
        }
        const { email, password, name } = parsedBody.data;
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return reply.code(409).send({ message: 'User already exists' });
        }
        const hashedPassword = await argon2_1.default.hash(password);
        const user = userRepository.create({
            email,
            passwordHash: hashedPassword,
            name
        });
        const seaveUser = await userRepository.save(user);
        const token = await reply.jwtSign({ sub: seaveUser.id, email: seaveUser.email });
        return reply.code(201).send({
            token,
            user: {
                id: seaveUser.id,
                email: seaveUser.email,
                name: seaveUser.name,
            }
        });
    });
    app.post('/login', async (request, reply) => {
        const parsedBody = auth_schema_1.loginSchema.safeParse(request.body);
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
        const isPasswordValid = await argon2_1.default.verify(user.passwordHash, password);
        if (!isPasswordValid) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }
        const token = await reply.jwtSign({ sub: user.id, email: user.email });
        return reply.code(201).send({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        });
    });
    app.get('/me', { preHandler: [app.authenticate] }, async (request, reply) => {
        const userId = request.user.sub;
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
    });
};
exports.authRoutes = authRoutes;
