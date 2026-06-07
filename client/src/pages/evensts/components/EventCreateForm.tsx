import { useEventsStore } from "@/stores/events-stores";
import { replace, useNavigate } from "react-router-dom"
import { EventForm } from "./EventForm";

type Props = {
    className?: string
}

export const EventCreateForm = ({ className }: Props) => {
    const navigate = useNavigate();
    const createEvent = useEventsStore(s => s.createEvent)
    const mutationLoading = useEventsStore(s => s.mutationLoading)
    const eventsError = useEventsStore(s => s.eventsError)

    return (
        <EventForm
            title="Create Event"
            subtitle="Create a new event"
            backTo="/events"
            backLabel="Back"
            cancelTo="/events"
            submitLabel="Create"
            submittingLabel="Creating..."
            error={eventsError}
            loading={mutationLoading}
            onsubmit={async (data) => {
                const create = await createEvent(data)
                navigate(`/events${create.id}`, { replace: true })
            }}
        />
    )
}
