import { useAuthBootstrap } from "@/hooks/use-auth-bootstrap"
import { Navigate } from "react-router-dom"
import { ProtectedLayout } from "./ProtectedLayout"

export const ProtectedRoutre = () => {
    const user = useAuthBootstrap()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <ProtectedLayout />
}
