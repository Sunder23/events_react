import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formStartsAt } from "@/lib/utils"
import type { EventDTO } from "@/schared/api/types"
import { Link } from "react-router-dom"

type Props = {
    event: EventDTO
}
export const EventListCard = ({ event }: Props) => (
    <Card className="h-full">
        <CardHeader>
            <CardTitle className="text-base">
                <Link
                    className="hover:text-primary hover:underline"
                    to={`/events/${event.id}`}>
                    {event.title}
                </Link>
            </CardTitle>
            <CardDescription>
                {formStartsAt(event.startDate)} - {formStartsAt(event.endDate)}
                <br />
                {event.address}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="line-clamp-3 text-muted-foreground">
                {event.description || '-'}
            </p>
        </CardContent>
        <CardFooter className="mt-auto justify-between pt-4">
            <span className="text-sm text-muted-foreground">
                Up to {event.capacity} visitors
            </span>
            <Button variant="outline" size="sm" asChild>
                <Link to={`/events/${event.id}`}>More</Link>
            </Button>
        </CardFooter>
    </Card>
)
