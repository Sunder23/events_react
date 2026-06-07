import { Link, useLocation } from "react-router-dom"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { PlusIcon, SquaresExclude } from "lucide-react"

export const AppSidebarNav = () => {
    const pathname = useLocation().pathname
    const isCreate = pathname === '/events/new'
    const isMy = pathname.startsWith('/events/my')
    const isAll = (
        pathname === '/events' ||
        pathname.startsWith('/events/') && !isMy && !isCreate)


    return (
        <SidebarMenu className="gap-3 px-1">
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={isCreate}
                    tooltip="Create new event"
                    className="min-h-12 bg-primary py-3 text-primary-foreground"
                >
                    <Link to='/events/new' className="gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <PlusIcon />
                        </span>
                        <span className="font-heading font-semibold">
                            New Event
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={isAll}
                    tooltip="All events"
                    className="min-h-12 bg-primary py-3 text-primary-foreground"
                >
                    <Link to='/events' className="gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <SquaresExclude />
                        </span>
                        <span className="font-heading font-semibold">
                            All Events
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={isMy}
                    tooltip="My events"
                    className="min-h-12 bg-primary py-3 text-primary-foreground"
                >
                    <Link to='/events/my' className="gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <SquaresExclude />
                        </span>
                        <span className="font-heading font-semibold">
                            My Events
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
