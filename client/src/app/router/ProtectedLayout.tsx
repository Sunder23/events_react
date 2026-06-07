import { AppSidebar } from "@/components/app-sidebar/AppSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"

export const ProtectedLayout = () => {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset >
                    <header className="flex h-12 items-center px-4 border-b border-border">
                        <SidebarTrigger />
                    </header>
                    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col p-4 pt-0">
                        <Outlet />
                    </div>
                </SidebarInset >
            </SidebarProvider>
        </TooltipProvider>
    )
}
