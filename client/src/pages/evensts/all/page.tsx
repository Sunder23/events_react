import { ErrorRetryBlock } from "@/components/ErrorRetryBlock"
import { PageShell } from "@/components/PageShell"
import { useEventsStore } from "@/stores/events-stores"
import { useEffect } from "react"
import { EventListCard } from "../components/EventListCard"

export function AllEventsPage() {
    const events = useEventsStore((state) => state.events)
    const loadEvents = useEventsStore((state) => state.loadAllEvents)
    const loading = useEventsStore((state) => state.eventsLoading)
    const error = useEventsStore((state) => state.eventsError)
    useEffect(() => {
        loadEvents()
    }, [loadEvents])
    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>

    const showIntialLoading = !loading && events.length === 0
    return (
        <PageShell title="All Events">
            {showIntialLoading ? 'Loading...' : null}
            {error ? <ErrorRetryBlock className="mb-4" message={error} /> : null}
            {!showIntialLoading && !error && events.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events found.</p>
            ) : null}
            <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    events.map((event) => (
                        <li key={event.id}>
                            <EventListCard event={event} />
                        </li>
                    ))
                }
            </ul>
        </PageShell>
    )
}
