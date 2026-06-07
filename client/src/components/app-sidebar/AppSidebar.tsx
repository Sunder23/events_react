import { useAuthStore } from "@/stores/auth-stores"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "../ui/sidebar"
import { AppSidebarBrand } from "./AppSidebarBrand"
import { AppSidebarNav } from "./AppSidebarNav"
import { AppSidebarFooter } from "./AppSidebarFooter"


export const AppSidebar = () => {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const { state } = useSidebar()

    if (!user) {
        return null
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-sideba-border p-3">
                <AppSidebarBrand />
            </SidebarHeader>
            <SidebarContent>
                <AppSidebarNav />
            </SidebarContent>
            <SidebarFooter>
                <AppSidebarFooter
                    user={user}
                    sidebarExpanded={state !== 'collapsed'}
                    onLogout={logout}
                />
            </SidebarFooter>
        </Sidebar>
    )
}
