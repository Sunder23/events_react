import { http } from "./http";
import type { CreateEventRequest, EventDTO, JoinEventResponse, UpdateEventRequest } from "./types";


export const eventsApi = {
    async list(): Promise<EventDTO[]> {
        const { data } = await http.get<EventDTO[]>('/events')
        return data
    },
    async getById(id: string): Promise<EventDTO> {
        const { data } = await http.get<EventDTO>(`/events/${id}`)
        return data
    },
    async create(payload: CreateEventRequest): Promise<EventDTO> {
        const { data } = await http.post<EventDTO>('/events', payload)
        return data
    },
    async update(id: string, payload: UpdateEventRequest): Promise<EventDTO> {
        const { data } = await http.patch<EventDTO>(`/events/${id}`, payload)
        return data
    },
    async remove(id: string): Promise<void> {
        await http.delete(`/events/${id}`)
    },
    async join(id: string): Promise<JoinEventResponse> {
        const { data } = await http.post<JoinEventResponse>(`/events/${id}/join`)
        console.log(data);

        return data
    },
    async leave(id: string): Promise<void> {
        await http.delete(`/events/${id}/join`)
    },
}