import { useAuthStore } from "@/stores/auth-stores"
import { useEventsStore } from "@/stores/events-stores"
import { Link, Navigate, useParams } from "react-router-dom"
import { useEventById } from "../hooks/useEventById"
import { PageShell } from "@/components/PageShell"
import { Button } from "@/components/ui/button"
import { EventDetaildCard } from "../components/EventDetaildCard"
import { useNavigate } from "react-router-dom"

export const EventDetailsPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const user = useAuthStore((s) => s.user)
    const joinedEvents = useEventsStore((s) => s.joinedEvents)
    const joinEvent = useEventsStore((s) => s.joinEvent)
    const leaveEvent = useEventsStore((s) => s.leaveEvent)
    const removeEvent = useEventsStore((s) => s.removeEvent)
    const mutationLoading = useEventsStore((s) => s.mutationLoading)
    const eventsError = useEventsStore((s) => s.eventsError)

    const { event, loading, notFound, loadError } = useEventById(id, {
        prefetchJoinedEvents: true,
    })
    if (!id) {
        return <Navigate to="/events" replace />
    }
    if (loading) {
        return (
            <PageShell title="Event">
                <span>Loading...</span>
            </PageShell>
        )
    }
    if (notFound) {
        return (
            <PageShell title="Event not found">
                <span>Event not found</span>
            </PageShell>
        )
    }

    if (loadError || !event) {
        return (
            <PageShell title="Error">
                {loadError && <span>{loadError}</span>}
            </PageShell>
        )
    }

    const isOwner = user.id === event?.ownerId
    const isJoined = joinedEvents.some((row) => row.event.id === event.id)
    const eventId = event.id

    const handleJoin = async () => {
        try {
            await joinEvent(eventId)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLeave = async () => {
        try {
            await leaveEvent(eventId)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async () => {
        const ok = confirm("Are you sure you want to remove this event?")
        if (!ok) return;
        try {
            await removeEvent(eventId)
            navigate('/events', { replace: true })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PageShell title={event.title}>
            <div className="mx-auto  flex w-full max-w-2xl flex-col gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    asChild
                >
                    <Link to="/events">Back to Events</Link>
                </Button>
                <EventDetaildCard
                    event={event}
                    isOwner={isOwner}
                    isJoined={isJoined}
                    mutationLoading={mutationLoading}
                    eventsError={eventsError}
                    onJoin={() => handleJoin()}
                    onLeave={() => handleLeave()}
                    onRemove={() => handleRemove()}
                />
            </div>
        </PageShell>
    )
}
