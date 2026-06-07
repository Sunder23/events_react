import { ensureAuthBootstraped } from "@/app/auth-bootstrap";
import { use } from "react";
import { useAuthStore } from "@/stores/auth-stores";

export function useAuthBootstrap() {
    use(ensureAuthBootstraped())
    return useAuthStore(state => state.user)
}
