import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"
import type { JoinedEventItem } from "@/schared/api/types"
import { formStartsAt } from "@/lib/utils"

type Props = {
    joinedEvents: JoinedEventItem[]
}
export const JoinedEvenstTable = ({
    joinedEvents
}: Props) => {
    const sorted = joinedEvents
        .slice()
        .sort((a, b) => a.event.startDate.localeCompare(b.event.startDate))
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
                {sorted.map((joinedEvent) => (
                    <TableRow key={joinedEvent.event.id}>
                        <TableCell>{joinedEvent.event.title}</TableCell>
                        <TableCell>{formStartsAt(joinedEvent.event.startDate)}</TableCell>
                        <TableCell>{formStartsAt(joinedEvent.event.endDate)}</TableCell>
                        <TableCell>{joinedEvent.event.address}</TableCell>
                        <TableCell>{joinedEvent.event.capacity}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to={`/events/${joinedEvent.event.id}`}>View</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
