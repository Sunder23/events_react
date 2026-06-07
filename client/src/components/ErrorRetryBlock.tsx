import { cn } from "@/lib/utils"

type Props = {
    message: string
    className?: string
}

export const ErrorRetryBlock = ({ message, className }: Props) => {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <p className="text-sm font-medium text-destructive">{message}</p>
        </div>
    )
}
