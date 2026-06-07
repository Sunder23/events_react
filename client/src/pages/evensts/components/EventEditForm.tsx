import { useAuthStore } from "@/stores/auth-stores";
import { useEventsStore } from "@/stores/events-stores";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEventById } from "../hooks/useEventById";
import { cn, DATETIME_LOCAL_INPUT_FORMAT } from "@/lib/utils";
import { format, isValid, parseISO } from "date-fns";
import { EventForm } from "./EventForm";


type Props = {
    className?: string;
}
export default function EventEditForm({ className }: Props) {
    const { id } = useParams<{ id: string }>();
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const updateEvent = useEventsStore((state) => state.updateEvent);
    const mutationLoading = useEventsStore((state) => state.mutationLoading);
    const eventsError = useEventsStore((state) => state.eventsError);

    const { event, loading, loadError, notFound } = useEventById(id, {
        prefetchJoinedEvents: true,
    })

    if (!id) {
        return <Navigate to="/events" replace />
    }
    if (loading) {
        return (
            <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
                Loading event...
            </div>
        )
    }
    if (notFound) {
        return (
            <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
                <p className="text-sm text-muted-foreground">
                    Event not found
                </p>
            </div>
        )
    }
    if (loadError || !event) {
        return (
            <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
                <p className="text-sm text-muted-foreground">
                    Error loading event
                </p>
            </div>
        )
    }

    if (!user || event?.ownerId !== user.id) {
        return (
            <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
                <p className="text-sm text-muted-foreground">
                    You are not authorized to edit this event
                </p>
            </div>
        )
    }

    const startedDateParsed = parseISO(event.startDate);
    const endDateParsed = parseISO(event.endDate);

    const startedDateForImput = isValid(startedDateParsed) ? format(startedDateParsed, DATETIME_LOCAL_INPUT_FORMAT) : "";
    const endedDateForImput = isValid(endDateParsed) ? format(endDateParsed, DATETIME_LOCAL_INPUT_FORMAT) : "";

    return (
        <EventForm
            title="Edit event"
            subtitle="Update event details"
            backTo={`/events/${event.id}`}
            backLabel="Back to event"
            cancelTo={`/events/${event.id}`}
            submitLabel="Update"
            submittingLabel="Updating..."
            inputValues={{
                title: event.title,
                description: event.description,
                address: event.address,
                capacity: event.capacity,
                startDate: startedDateForImput,
                endDate: endedDateForImput,
            }}
            error={eventsError}
            loading={mutationLoading}
            onsubmit={async (data) => {
                await updateEvent(event.id, data);
                navigate(`/events/${event.id}`, { replace: true });
            }}
        />
    );
}