import { getApiErrorMessage } from "@/lib/utils";
import { eventsApi } from "@/schared/api/events-api";
import { meApi } from "@/schared/api/me-api";
import type { CreateEventRequest, EventDTO, JoinedEventItem, UpdateEventRequest } from "@/schared/api/types";
import { create } from "zustand";

export type MyEvenstFilter = 'created' | 'joined'

type EventsState = {
    events: EventDTO[],
    joinedEvents: JoinedEventItem[]
    myEventsFilter: MyEvenstFilter
    eventsLoading: boolean
    joinedLoading: boolean
    mutationLoading: boolean
    eventsError: string | null

    setMyEventsFilter: (filter: MyEvenstFilter) => void
    loadAllEvents: () => Promise<void>
    loadJoinedEvents: () => Promise<void>
    createEvent: (payload: CreateEventRequest) => Promise<EventDTO>
    updateEvent: (id: string, payload: UpdateEventRequest) => Promise<EventDTO>
    removeEvent: (id: string) => Promise<void>
    joinEvent: (id: string) => Promise<void>
    leaveEvent: (id: string) => Promise<void>
}

export const useEventsStore = create<EventsState>()((set, get) => ({
    events: [],
    joinedEvents: [],
    myEventsFilter: 'created',
    eventsLoading: false,
    joinedLoading: false,
    mutationLoading: false,
    eventsError: null,

    setMyEventsFilter: (filter: MyEvenstFilter) => set(() => ({ myEventsFilter: filter })),
    loadAllEvents: async () => {
        set({ eventsLoading: true, eventsError: null })
        try {
            const list = await eventsApi.list()
            set({ events: list, eventsLoading: false })
        } catch (error) {
            set({ eventsLoading: false, eventsError: getApiErrorMessage(error, 'Failed to load events') })
            throw error
        }
    },
    loadJoinedEvents: async () => {
        set({ joinedLoading: true, eventsError: null })
        try {
            const list = await meApi.joinedEvents()
            set({ joinedEvents: list, joinedLoading: false })
        } catch (error) {
            set({ joinedLoading: false, eventsError: getApiErrorMessage(error, 'Failed to load joined events') })
            throw error
        }
    },
    createEvent: async (payload: CreateEventRequest) => {
        set({ mutationLoading: true, eventsError: null })
        try {
            const created = await eventsApi.create(payload)
            set((state) => ({
                events: [...state.events, created].sort((a, b) => a.startDate.localeCompare(b.startDate)),
                mutationLoading: false
            }))
            return created
        } catch (error) {
            set({ mutationLoading: false, eventsError: getApiErrorMessage(error, 'Failed to create event') })
            throw error
        }
    },
    updateEvent: async (id: string, payload: UpdateEventRequest) => {
        set({ mutationLoading: true })
        try {
            const updated = await eventsApi.update(id, payload)
            set((state) => ({
                events: state.events
                    .map((event) => event.id === id ? updated : event)
                    .sort((a, b) => a.startDate.localeCompare(b.startDate)),
                joinedEvents: state.joinedEvents
                    .map((row) => row.event.id === id ? { ...row, event: updated } : row),
                mutationLoading: false
            }))
            return updated
        } catch (error) {
            set({ mutationLoading: false, eventsError: getApiErrorMessage(error, 'Failed to update event') })
            throw error
        }
    },
    removeEvent: async (id: string) => {
        set({ mutationLoading: true, eventsError: null })
        try {
            await eventsApi.remove(id)
            set((state) => ({
                events: state.events.filter((event) => event.id !== id),
                joinedEvents: state.joinedEvents.filter((row) => row.event.id !== id),
                mutationLoading: false
            }))
        } catch (error) {
            set({ mutationLoading: false, eventsError: getApiErrorMessage(error, 'Failed to remove event') })
            throw error
        }
    },
    joinEvent: async (id: string) => {
        set({ mutationLoading: true, eventsError: null })
        try {
            await eventsApi.join(id)
            await get().loadJoinedEvents()
            set({ mutationLoading: false })
        } catch (error) {
            set({ mutationLoading: false, eventsError: getApiErrorMessage(error, 'Failed to join event') })
            throw error
        }
    },
    leaveEvent: async (id: string) => {
        set({ mutationLoading: true, eventsError: null })
        try {
            await eventsApi.leave(id)
            set((state) => ({
                joinedEvents: state.joinedEvents.filter((row) => row.event.id !== id),
                mutationLoading: false
            }))
        } catch (error) {
            set({ mutationLoading: false, eventsError: getApiErrorMessage(error, 'Failed to leave event') })
            throw error
        }
    },

}))

