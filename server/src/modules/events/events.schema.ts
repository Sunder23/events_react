import z from "zod";


export const createEventSchema = z.object({
    title: z.string().trim().min(2).max(200),
    description: z.string().trim().min(1),
    capacity: z.number().int().nonnegative(),
    address: z.string().trim().min(1).max(255),
    startDate: z.string().transform((date) => new Date(date)),
    endDate: z.string().transform((date) => new Date(date)),
})

export const updateEventSchema = z.object({
    title: z.string().trim().min(2).max(200).optional(),
    description: z.string().trim().min(1).optional(),
    capacity: z.number().int().nonnegative().optional(),
    address: z.string().trim().min(1).max(255).optional(),
    startDate: z.string().transform((date) => new Date(date)).optional(),
    endDate: z.string().transform((date) => new Date(date)).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
    path: ['root']
})

