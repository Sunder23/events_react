import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formStartsAt } from "@/lib/utils"
import type { EventDTO } from "@/schared/api/types"
import { Link } from "react-router-dom"

type Props = {
    events: EventDTO[]
}
export const CreatedEvenstTable = ({
    events
}: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event) => (
                    <TableRow key={event.id}>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{formStartsAt(event.startDate)}</TableCell>
                        <TableCell>{formStartsAt(event.endDate)}</TableCell>
                        <TableCell>{event.address}</TableCell>
                        <TableCell>{event.capacity}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to={`/events/${event.id}`}>View</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
