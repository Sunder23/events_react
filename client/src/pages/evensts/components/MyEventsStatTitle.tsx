interface Props {
    label: string
    count: number
}

export const MyEventsStatTitle = ({
    label,
    count
}: Props) => {
    return (
        <div className="rounded-lg border bg-muted/30 px-4 py-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-semibold tabular-nums">{count}</p>
        </div>
    )
}
