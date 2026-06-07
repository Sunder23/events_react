import { FastifyPluginAsync } from "fastify";
import { AppDataSource } from "../../db/data-source";
import { EventParticipant } from "../../db/entities/event-paticipant.entities";

export const meRoutes: FastifyPluginAsync = async (app) => {
    const eventParticipantRepository = AppDataSource.getRepository(EventParticipant)
    app.get('/events/joined', { preHandler: [app.authenticate] }, async (request, reply) => {
        const participants = await eventParticipantRepository.find({
            where: { userId: request.user.sub },
            relations: {
                event: true,
            },
            order: {
                joinedDate: 'DESC'
            }
        })
        return participants.map((participant) => ({
            joinedDate: participant.joinedDate,
            event: participant.event
        }))
    })
}
