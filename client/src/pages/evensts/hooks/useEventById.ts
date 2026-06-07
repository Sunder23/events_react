import { getApiErrorMessage } from "@/lib/utils"
import { eventsApi } from "@/schared/api/events-api"
import type { EventDTO } from "@/schared/api/types"
import { useEventsStore } from "@/stores/events-stores"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"

type UseEventByIdOptions = {
    prefetchJoinedEvents?: boolean
}
export function useEventById(id: string, options?: UseEventByIdOptions) {
    const prefetchJoinedEvents = options.prefetchJoinedEvents ?? false
    const loadJoinedEvents = useEventsStore((state) => state.loadJoinedEvents)

    const [event, setEvent] = useState<EventDTO | null>(null)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [loadError, setLoadError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        if (!id) {
            setEvent(null)
            setLoading(false)
            setNotFound(true)
            setLoadError(null)
            return () => {
                cancelled = true
            }
        }
        const loadEvent = async () => {
            setLoading(true)
            setNotFound(false)
            setLoadError(null)
            try {
                const [event,] = await Promise.all([
                    eventsApi.getById(id),
                    prefetchJoinedEvents
                        ? loadJoinedEvents().catch(() => undefined)
                        : Promise.resolve(undefined)
                ])
                if (!cancelled) {
                    setEvent(event)
                }
            } catch (error) {
                if (cancelled) return
                if (isAxiosError(error) && error.response?.status === 404) {
                    setNotFound(true)
                    return
                }
                setLoadError(getApiErrorMessage(error, 'Failed to load event'))
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }
        loadEvent()
        return () => {
            cancelled = true
        }
    }, [id, loadJoinedEvents, prefetchJoinedEvents])
    return { event, loadError, loading, notFound }

}


