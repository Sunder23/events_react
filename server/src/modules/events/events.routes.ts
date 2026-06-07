import { FastifyPluginAsync } from "fastify";
import { AppDataSource } from "../../db/data-source";
import { Event as EventEntity } from "../../db/entities/event.entities";
import { EventParticipant } from "../../db/entities/event-paticipant.entities";
import { createEventSchema, updateEventSchema } from "./events.schema";

export const eventRoutes: FastifyPluginAsync = async (app) => {
    const eventRepository = AppDataSource.getRepository(EventEntity)
    const eventParticipantRepository = AppDataSource.getRepository(EventParticipant)
    app.post('/', { preHandler: [app.authenticate] }, async (request, reply) => {
        const parsedBody = createEventSchema.safeParse(request.body);
        if (!parsedBody.success) {
            return reply.code(400).send({
                message: 'Invalid request body',
                error: parsedBody.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        const { title, description, capacity, address, startDate, endDate } = parsedBody.data;
        const event = eventRepository.create({
            title,
            description,
            capacity,
            address,
            startDate,
            endDate,
            ownerId: request.user.sub
        });
        const savedEvent = await eventRepository.save(event);
        return reply.code(201).send(savedEvent);
    })
    app.get('/', { preHandler: [app.authenticate] }, async (request, reply) => {
        return eventRepository.find(
            { order: { startDate: 'ASC' } }
        )
    })
    app.get('/:id', { preHandler: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const event = await eventRepository.findOne({ where: { id } });
        if (!event) {
            return reply.code(404).send({ message: 'Event not found' });
        }
        return reply.code(201).send(event);
    })
    app.patch('/:id', { preHandler: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }

        const event = await eventRepository.findOne({ where: { id } });
        if (!event) {
            return reply.code(404).send({ message: 'Event not found' });
        }
        if (event.ownerId !== request.user.sub) {
            return reply.code(403).send({ message: 'Forbidden' });
        }

        const parsedBody = updateEventSchema.safeParse(request.body);
        if (!parsedBody.success) {
            return reply.code(400).send({
                message: 'Invalid request body',
                error: parsedBody.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        const { title, description, capacity, address, startDate, endDate, } = parsedBody.data;
        if (title !== undefined) {
            event.title = title
        }
        if (description !== undefined) {
            event.description = description
        }
        if (capacity !== undefined) {
            event.capacity = capacity
        }
        if (address !== undefined) {
            event.address = address
        }
        if (startDate !== undefined) {
            event.startDate = startDate
        }
        if (endDate !== undefined) {
            event.endDate = endDate
        }
        const updatedEvent = await eventRepository.save(event);
        return reply.code(201).send(updatedEvent);
    })
    app.delete('/:id', { preHandler: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const event = await eventRepository.findOne({ where: { id } });
        if (!event) {
            return reply.code(404).send({ message: 'Event not found' });
        }
        if (event.ownerId !== request.user.sub) {
            return reply.code(403).send({ message: 'Forbidden' });
        }
        await eventRepository.delete({ id });
        return reply.code(200).send();
    })
    app.post('/:id/join', { preHandler: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const event = await eventRepository.findOne({ where: { id } });
        if (!event) {
            return reply.code(404).send({ message: 'Event not found' });
        }
        if (event.ownerId === request.user.sub) {
            return reply.code(403).send({ message: `Forbidden - ${request.user.sub} is not the owner of the event ${event.ownerId}` });
        }
        const existingParticipant = await eventParticipantRepository.findOne({ where: { eventId: event.id, userId: request.user.sub } });
        if (existingParticipant) {
            return reply.code(409).send({ message: 'You are already a participant' });
        }
        const participantsCount = await eventParticipantRepository.count({ where: { eventId: event.id } });
        if (participantsCount >= event.capacity) {
            return reply.code(409).send({ message: 'Event is full' });
        }
        const participant = eventParticipantRepository.create({
            eventId: event.id,
            userId: request.user.sub,
        });
        const savedParticipant = await eventParticipantRepository.save(participant);
        return reply.code(201).send({
            message: 'You have successfully joined the event',
            participant: savedParticipant
        });
    })
    app.delete('/:id/join', { preHandler: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const event = await eventRepository.findOne({ where: { id } });
        if (!event) {
            return reply.code(404).send({ message: 'Event not found' });
        }

        const existingParticipant = await eventParticipantRepository.findOne({ where: { eventId: event.id, userId: request.user.sub } });
        if (!existingParticipant) {
            return reply.code(409).send({ message: 'You are not a participant' });
        }
        await eventParticipantRepository.delete({
            id: existingParticipant.id,
        });
        return reply.code(200).send({
            message: 'You have successfully left the event',
        });
    })
}