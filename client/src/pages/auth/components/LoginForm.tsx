import { useAuthStore } from "@/stores/auth-stores"
import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthFormCard } from "./AuthFormCard"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { AuthFormErrorAlert } from "./AuthFormErrorAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const LoginForm = () => {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const authError = useAuthStore((state) => state.authError)
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading)

    const [clientError, setClientError] = useState<string | null>(null)

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setClientError(null)

        const formData = new FormData(event.currentTarget)

        const email = String(formData.get('email') ?? '').trim()
        const password = String(formData.get('password') ?? '')

        if (!email || !password) {
            setClientError('Please fill in all fields')
            return
        }

        try {
            await login({ email, password })
            navigate('/events', { replace: true })
        } catch {
        }
    }

    const topError = clientError ?? authError
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <AuthFormCard
                title="Login"
                description="Login to your account"
            >
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <AuthFormErrorAlert message={topError} />
                        <Field>
                            <FieldLabel htmlFor="login-email">Email </FieldLabel>
                            <Input
                                id="login-email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="login-password">Password </FieldLabel>
                            <Input
                                id="login-password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isAuthLoading}
                            >
                                {isAuthLoading ? 'Logging in...' : 'Login'}
                            </Button>
                            <FieldDescription className="text-center">
                                Don't have an account?{" "}
                                <Link
                                    className=" underline-offset-4 hover:underline "
                                    to="/register"
                                    onClick={() => {
                                        useAuthStore.getState().clearAuthError()
                                        setClientError(null)
                                    }}
                                >
                                    Register
                                </Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </AuthFormCard>
        </div>
    )
}
