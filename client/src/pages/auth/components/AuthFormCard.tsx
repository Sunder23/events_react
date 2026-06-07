import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
    title: string
    children: React.ReactNode
    description: string
}

export const AuthFormCard = ({
    title,
    description,
    children
}: Props) => {
    return (
        <Card >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}
