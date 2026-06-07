import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formStartsAt } from "@/lib/utils"
import type { EventDTO } from "@/schared/api/types"
import { Link } from "react-router-dom"

type Props = {
    event: EventDTO
    isOwner: boolean
    isJoined: boolean
    mutationLoading: boolean
    eventsError: string | null
    onJoin: () => void
    onLeave: () => void
    onRemove: () => void
}

export const EventDetaildCard = ({
    event,
    isOwner,
    isJoined,
    mutationLoading,
    eventsError,
    onJoin,
    onLeave,
    onRemove
}: Props) => {
    return (
        <>
            {
                eventsError && (
                    <p className="txt-sm text-destructive">{eventsError}</p>
                )
            }
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg leading-snug">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div>
                        <p className="text-muted-foreground">Description:</p>
                        <p> {event.description}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Starts:</p>
                        <p> {formStartsAt(event.startDate)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Ends:</p>
                        <p> {formStartsAt(event.endDate)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Address:</p>
                        <p className="font-medium">{event.address}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Capacity:</p>
                        <p className="font-medium">Up to {event.capacity} people</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 border-t">
                    {
                        isOwner ? (
                            <>
                                <p className="mr-auto fext-sm text-mutedforeground">You created this event</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                >
                                    <Link to={`edit`}>
                                        Edit Event
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onRemove()}
                                    disabled={mutationLoading}
                                >
                                    Remove Event
                                </Button>
                            </>
                        ) : isJoined ? (
                            <Button
                                variant="outline"
                                disabled={mutationLoading}
                                onClick={() => onLeave()}
                            >
                                Leave Event
                            </Button>
                        ) : (
                            <Button
                                disabled={mutationLoading}
                                onClick={() => onJoin()}
                            >
                                Join Event
                            </Button>
                        )
                    }
                </CardFooter>
            </Card>
        </>
    )
}
