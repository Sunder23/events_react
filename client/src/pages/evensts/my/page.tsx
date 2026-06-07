import { PageShell } from "@/components/PageShell"
import { useAuthStore } from "@/stores/auth-stores"
import { useEventsStore } from "@/stores/events-stores"
import { useEffect } from "react"
import { MyEventsStatTitle } from "../components/MyEventsStatTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatedEvenstTable } from "../components/CreatedEvenstTable"
import { JoinedEvenstTable } from "../components/JoinedEvenstTable"

export default function EventsMyPage() {
    const user = useAuthStore(s => s.user)
    const events = useEventsStore(s => s.events)
    const joinedEvents = useEventsStore(s => s.joinedEvents)
    const myEventsFilter = useEventsStore(s => s.myEventsFilter)
    const setMyEventsFilter = useEventsStore(s => s.setMyEventsFilter)
    const loadEvents = useEventsStore(s => s.loadAllEvents)
    const loadJoinedEvents = useEventsStore(s => s.loadJoinedEvents)
    const eventsLoading = useEventsStore(s => s.eventsLoading)
    const joinedLoading = useEventsStore(s => s.joinedLoading)
    const eventsError = useEventsStore(s => s.eventsError)

    useEffect(() => {
        Promise.all([
            loadEvents(),
            loadJoinedEvents()
        ])
    }, [loadEvents, loadJoinedEvents])
    const createdList = () => {
        if (!user) return []
        return events
            .filter(e => e.ownerId === user.id)
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
    }
    const createdCount = createdList().length
    const joinedCount = joinedEvents.length


    return (
        <PageShell title="My Events">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                    <MyEventsStatTitle
                        label='Created Events'
                        count={createdCount}
                    />
                    <MyEventsStatTitle
                        label='Joined Events'
                        count={joinedCount}
                    />
                </div>
                {
                    eventsError && <p>Event Error: {eventsError}</p>
                }
                <Tabs
                    value={myEventsFilter}
                    onValueChange={(value) => {
                        if (value === 'created' || value === 'joined') setMyEventsFilter(value)
                    }}
                    className="gap-4"
                >
                    <TabsList className="w-full max-w-md gap-2">
                        <TabsTrigger value="created" className="flex-1">Created</TabsTrigger>
                        <TabsTrigger value="joined" className="flex-1">Joined</TabsTrigger>
                    </TabsList>
                    <TabsContent value="created" className="mt-0">
                        {eventsLoading && <p>Loading created events...</p>}
                        {!eventsLoading && createdCount === 0 && <p>No created events</p>}
                        <CreatedEvenstTable events={createdList()} />
                    </TabsContent>
                    <TabsContent value="joined" className="mt-0">
                        {joinedLoading && <p>Loading joined events...</p>}
                        {!joinedLoading && joinedCount === 0 && <p>No joined events</p>}
                        <JoinedEvenstTable joinedEvents={joinedEvents} />
                    </TabsContent>
                </Tabs>
            </div>
        </PageShell >
    )
}