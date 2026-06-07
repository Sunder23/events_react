import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn, DATETIME_LOCAL_INPUT_FORMAT } from "@/lib/utils"
import type { CreateEventRequest } from "@/schared/api/types"
import { ArrowLeft } from "lucide-react"
import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formatISO, isValid, parse } from "date-fns"

type EventFormValues = CreateEventRequest

type Props = {
    title: string
    subtitle: string
    backTo: string
    backLabel: string
    cancelTo: string
    submitLabel: string
    submittingLabel: string
    onsubmit: (data: EventFormValues) => Promise<void>
    inputValues?: EventFormValues
    error: string
    loading: boolean
    className?: string
}
export const EventForm = ({
    title,
    subtitle,
    backTo,
    backLabel,
    cancelTo,
    submitLabel,
    submittingLabel,
    inputValues,
    error,
    loading,
    className,
    onsubmit
}: Props) => {
    const navigate = useNavigate()
    const [capacity, setCapacity] = useState(inputValues?.capacity ?? 50)
    const [clientError, setClientError] = useState<string | null>(null)

    const topError = clientError ?? error
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setClientError(null)
        const formElement = event.currentTarget
        const formData = new FormData(formElement)

        const title = String(formData.get('title') ?? '').trim()
        const description = String(formData.get('description') ?? '').trim()
        const address = String(formData.get('address') ?? '').trim()
        const startDate = String(formData.get('startDate') ?? '').trim()
        const endDate = String(formData.get('endDate') ?? '').trim()

        const startedDateParsed = parse(
            startDate,
            DATETIME_LOCAL_INPUT_FORMAT,
            new Date()
        )
        const endDateParsed = parse(
            endDate,
            DATETIME_LOCAL_INPUT_FORMAT,
            new Date()
        )

        const startedDate = isValid(startedDateParsed)
            ? formatISO(startedDateParsed)
            : null

        const endedDate = isValid(endDateParsed)
            ? formatISO(endDateParsed)
            : null

        if (!startedDate) {
            setClientError('Invalid start date')
            return
        }
        if (!endedDate) {
            setClientError('Invalid end date')
            return
        }

        const request: EventFormValues = {
            title: title,
            description: description,
            capacity: capacity,
            address: address,
            startDate: startDate,
            endDate: endDate,
        }
        await onsubmit(request)
    }
    return (
        <div className={cn('mx-auto w-full max-w-2xl space-y-6', className)}>
            <div className="space-y-1">
                <Button variant="ghost" size="sm" asChild>
                    <Link to={backTo}>
                        <ArrowLeft className="size-4" />
                        {backLabel}
                    </Link>
                </Button>
                <h1 className="font-heading text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                        {topError && <p className="text-sm text-destructive">{topError}</p>}
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={inputValues?.title}
                                    placeholder="Up to 200 symbols"
                                    maxLength={200}
                                    required
                                    disabled={loading}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={inputValues?.description}
                                    placeholder="Not empty value"
                                    rows={5}
                                    required
                                    disabled={loading}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="datetime-local"
                                    defaultValue={inputValues?.startDate}
                                    required
                                    disabled={loading}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="datetime-local"
                                    defaultValue={inputValues?.endDate}
                                    required
                                    disabled={loading}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="address">Address</FieldLabel>
                                <Input
                                    id="address"
                                    name="address"
                                    defaultValue={inputValues?.address}
                                    placeholder="Up to 255 symbols"
                                    maxLength={255}
                                    required
                                    disabled={loading}
                                />
                            </Field>
                            <Field>
                                <div className="flex flex-col justify-between gap-4">
                                    <FieldLabel
                                        htmlFor="capacity-slider"
                                        className="inline-flex items-center gap-2"
                                    >Capacity
                                        <span className="text-sm text-muted-foreground tabular-nums">
                                            {capacity}
                                        </span>
                                    </FieldLabel>

                                    <Slider
                                        id="capacity-slider"
                                        className="mb-4"
                                        min={1}
                                        max={100}
                                        value={[capacity]}
                                        onValueChange={(value) => setCapacity(value[0] ?? 1)}
                                        disabled={loading}
                                    >

                                    </Slider>
                                </div>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="justify-end gap-2 border-t">
                        <Button
                            variant="ghost"
                            type="button"
                            disabled={loading}
                            onClick={() => navigate(cancelTo)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? submittingLabel : submitLabel}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
