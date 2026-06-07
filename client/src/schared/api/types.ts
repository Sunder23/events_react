export type UserPublic = {
    id: string
    name: string
    email: string
}
export type UserProfile = UserPublic & {
    createdAt: string
    updatedAt: string
}

export type AuthLoginRequest = {
    email: string
    password: string
}

export type AuthResponse = {
    token: string
    user: UserPublic
}
export type AuthRegisterRequest = {
    email: string
    password: string
    name: string
}

export type ApiFieldError = {
    path: string
    message: string
}
export type ApiErrorResponce = {
    code: string
    message: ApiFieldError[]
}

export type EventDTO = {
    id: string
    title: string
    description: string
    capacity: number
    address: string
    startDate: string
    endDate: string
    ownerId: string
    createdAt: string
    updatedAt: string
}

export type CreateEventRequest = {
    title: string
    description: string
    capacity: number
    address: string
    startDate: string
    endDate: string
}

export type UpdateEventRequest = Partial<CreateEventRequest>
export type JoinEventResponse = {
    message: string
    participation: {
        id: string
        eventId: string
        userId: string
        joinedAt: string
    }
}

export type JoinedEventItem = {
    joinedAt: string
    event: EventDTO
}