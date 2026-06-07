"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const data_source_1 = require("../../db/data-source");
const event_entities_1 = require("../../db/entities/event.entities");
const event_paticipant_entities_1 = require("../../db/entities/event-paticipant.entities");
const events_schema_1 = require("./events.schema");
const eventRoutes = async (app) => {
    const eventRepository = data_source_1.AppDataSource.getRepository(event_entities_1.Event);
    const eventParticipantRepository = data_source_1.AppDataSource.getRepository(event_paticipant_entities_1.EventParticipant);
    app.post('/', { preHandler: [app.authenticate] }, async (request, reply) => {
        const parsedBody = events_schema_1.createEventSchema.safeParse(request.body);
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
    });
};
exports.eventRoutes = eventRoutes;
