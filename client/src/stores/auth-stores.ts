import { getAuthToken, setAuthToken } from "@/schared/api/auth-token";
import type { AuthLoginRequest, AuthRegisterRequest, UserPublic } from "../schared/api/types";
import { create } from "zustand";
import { authApi } from "@/schared/api/auth-api";
import { getApiErrorMessage } from "@/lib/utils";

type AuthState = {
    user: UserPublic | null
    bootstrapped: boolean
    isAuthLoading: boolean
    authError: string | null

    bootstrap: () => Promise<void>
    login: (request: AuthLoginRequest) => Promise<void>
    register: (request: AuthRegisterRequest) => Promise<void>
    logout: () => void
    clearAuthError: () => void
    featchMe: () => Promise<void>
}

function profileToUser(profile: {
    id: string,
    name: string,
    email: string
}): UserPublic {
    return {
        id: profile.id,
        name: profile.name,
        email: profile.email
    }
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    bootstrapped: false,
    isAuthLoading: false,
    authError: null,

    bootstrap: async () => {
        if (get().bootstrapped) return;
        set({ isAuthLoading: true, authError: null })
        try {
            if (!getAuthToken()) {
                set({ user: null, bootstrapped: true, isAuthLoading: false });
                return;
            }
            const profile = await authApi.me();
            set({
                user: profileToUser(profile),
                bootstrapped: true,
                isAuthLoading: false
            })
        } catch (error) {
            setAuthToken(null)
            set({
                user: null,
                bootstrapped: true,
                isAuthLoading: false
            })
            console.error(error)
        }
    },

    login: async (payload) => {
        set({ isAuthLoading: true, authError: null })
        try {
            const { token, user } = await authApi.login(payload)
            setAuthToken(token)
            set({ user, isAuthLoading: false })
        } catch (error) {
            setAuthToken(null)
            set({
                isAuthLoading: false,
                authError: getApiErrorMessage(error, 'Failed to login. Please try again later.')
            })
            throw error
        }
    },

    register: async (request) => {
        set({ isAuthLoading: true, authError: null })
        try {
            const { token, user } = await authApi.register(request)
            setAuthToken(token)
            set({ user, isAuthLoading: false })
        } catch (error) {
            setAuthToken(null)
            set({
                isAuthLoading: false,
                authError: getApiErrorMessage(error, 'Failed to register. Please try again later.')
            })
            throw error
        }
    },

    logout: async () => {
        setAuthToken(null)
        set({ user: null, authError: null })
    },

    clearAuthError: () => {
        set({ authError: null })
    },
    featchMe: async () => {
        if (!getAuthToken()) {
            set({ user: null, bootstrapped: true, isAuthLoading: false });
            return;
        }
        try {
            const profile = await authApi.me()
            set({
                user: profileToUser(profile)
            })
        } catch (error) {
            setAuthToken(null)
            set({
                user: null,
                authError: getApiErrorMessage(error, 'Failed to fetch user profile.')
            })
        }

    }
}))
