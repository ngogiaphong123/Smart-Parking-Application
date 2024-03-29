import {z} from 'zod';
const userCore = {
    email : z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Email is not valid',
    }),
    password : z.string({
        required_error: 'Password is required',
    }).min(6, {
        message: 'Password must be at least 6 characters',
    })
}

export const registerUserSchema = z.object({
    ...userCore,
    confirmPassword : z.string({
        required_error: 'Confirm Password is required',
    }).min(6, {
        message: 'Confirm Password must be at least 6 characters',
    }),
    firstName : z.string({
        required_error: 'Frist name is required',
    }),
    lastName : z.string({
        required_error: 'Last name is required',
    }),
    role : z.string({
        required_error: 'Role is required',
    }),
    phone : z.string({
        required_error: 'Phone number is required',
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
});

export const loginUserSchema = z.object({
    ...userCore,
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
