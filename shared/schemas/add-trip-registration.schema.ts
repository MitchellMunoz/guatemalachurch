// shared/schemas/add-trip-registration-form.ts
import type { DateValue } from '@internationalized/date';
import { z } from 'zod';

export type IndividualRegistrationForm = z.infer<typeof IndividualRegistrationFormSchema>;

export const IndividualRegistrationFormSchema = z.object({
    email: z.email({ message: 'Email is invalid' }),
    fName: z.string().min(1),
    lName: z.string().min(1),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal: z.string().optional(),
    phone: z.string().optional(),
    dob: z.custom<DateValue>().optional(), // Date of Birth (optional)
    cName: z.string().optional(),
    pName: z.string().optional(),
});

export type ChurchRegistrationForm = z.infer<typeof ChurchRegistrationFormSchema>;

export const ChurchRegistrationFormSchema = z.object({
    email: z.email({ message: 'Email is invalid' }),
    fName: z.string().optional(),
    lName: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal: z.string().optional(),
    phone: z.string().optional(),
    dob: z.custom<DateValue>().optional(),
    cName: z.string().min(1), // Church Name (required for church tab)
    pName: z.string().min(1), // Primary Contact (required for church tab)
});
