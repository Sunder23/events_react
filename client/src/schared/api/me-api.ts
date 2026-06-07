import { http } from "./http"
import type { EventDTO, JoinedEventItem } from "./types"

export const meApi = {
    async joinedEvents(): Promise<JoinedEventItem[]> {
        const { data } = await http.get<JoinedEventItem[]>('/me/events/joined')
        return data
    },
    async createdEvents(): Promise<EventDTO[]> {
        const { data } = await http.get<EventDTO[]>('/me/events')
        return data
    }
}