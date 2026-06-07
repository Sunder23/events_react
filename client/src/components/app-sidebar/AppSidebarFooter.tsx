import type { UserPublic } from "@/schared/api/types"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { getUserInitials } from "@/lib/utils"
import { LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
    user: UserPublic
    sidebarExpanded: boolean
    onLogout: () => void
}

export const AppSidebarFooter = ({
    user,
    sidebarExpanded,
    onLogout
}: Props) => {
    return (
        <SidebarMenu className="gap-2 px-1">
            {
                sidebarExpanded ? (
                    <SidebarMenuItem className="flex item-center gap-2 rounde-mx px-2 py-1 ">
                        <Avatar className="size-8 rounded-lg bg-muted">
                            <AvatarFallback className="roundex-lg  text-xs">
                                {getUserInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{user.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </SidebarMenuItem>
                ) : null
            }
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    asChild
                    onClick={() => onLogout()}
                    tooltip="Logout"
                    className="min-h-12 bg-primary py-3 text-primary-foreground"
                >
                    <Link to='/logout' className="gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <LogOutIcon />
                        </span>
                        <span className="font-heading font-semibold">
                            Logout
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
