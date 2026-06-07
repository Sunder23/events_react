import { useAuthStore } from "@/stores/auth-stores"
import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthFormCard } from "./AuthFormCard"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { AuthFormErrorAlert } from "./AuthFormErrorAlert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const RegisterForm = () => {
    const navigate = useNavigate()
    const register = useAuthStore((state) => state.register)
    const authError = useAuthStore((state) => state.authError)
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading)

    const [clientError, setClientError] = useState<string | null>(null)

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setClientError(null)

        const formData = new FormData(event.currentTarget)

        const name = String(formData.get('name') ?? '').trim()
        const email = String(formData.get('email') ?? '').trim()
        const password = String(formData.get('password') ?? '')
        const confirmPassword = String(formData.get('confirmPassword') ?? '')

        if (password !== confirmPassword) {
            setClientError('Passwords do not match')
            return
        }

        if (password.length < 8) {
            setClientError('Password must be at least 8 characters long')
            return
        }
        if (name.length < 2) {
            setClientError('Name must be at least 2 characters long')
            return
        }
        if (name.length > 100) {
            setClientError('Name must be at most 100 characters long')
            return
        }
        try {
            await register({ name, email, password })
        } catch {
        }

    }
    const topError = clientError ?? authError
    return (
        <div className="flex  w-full max-w-sm flex-col gap-6">
            <AuthFormCard
                title="Register"
                description="Create a new account"
            >
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <AuthFormErrorAlert message={topError} />
                        <Field>
                            <FieldLabel htmlFor="register-name">Name </FieldLabel>
                            <Input
                                id="register-name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                                minLength={2}
                                maxLength={100}
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-email">Email </FieldLabel>
                            <Input
                                id="register-email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-password">Password </FieldLabel>
                            <Input
                                id="register-password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-confirm-password">Confirm password </FieldLabel>
                            <Input
                                id="register-confirm-password"
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
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
                                {isAuthLoading ? 'Registering...' : 'Register'}
                            </Button>
                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <Link
                                    className=" underline-offset-4 hover:underline "
                                    to="/login"
                                    onClick={() => {
                                        useAuthStore.getState().clearAuthError()
                                        setClientError(null)
                                    }}
                                >
                                    Login
                                </Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </AuthFormCard>
        </div>
    )
}
