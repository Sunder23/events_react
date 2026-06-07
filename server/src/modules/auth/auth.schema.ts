import z from "zod";

const emailFields = z
    .string()
    .trim()
    .pipe(z.email('Invalid email address'))
    .transform((email) => email.toLowerCase());


export const registerSchema = z.object({
    email: emailFields,
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name: z.string().trim().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long')
})

export const loginSchema = z.object({
    email: emailFields,
    password: z.string().min(1, 'Password is required'),
})

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
