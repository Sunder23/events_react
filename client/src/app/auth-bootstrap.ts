import { useAuthStore } from "@/stores/auth-stores"

let bootstrapPromise: Promise<void> | null = null
export function ensureAuthBootstraped(): Promise<void> {
    if (!bootstrapPromise) {
        bootstrapPromise = useAuthStore.getState().bootstrap()
    }
    return bootstrapPromise
}
