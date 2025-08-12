import type { DateValue } from '@internationalized/date';
import { z } from 'zod';
import { Currency, ExpenseMethod } from '~~/.generated/prisma/enums';

export type AddExpenseForm = z.infer<typeof AddExpenseFormSchema>;

export const AddExpenseFormSchema = z.object({
    amount: z.number().min(0),
    merchant: z.string().min(1),
    dateOfPurchase: z.custom<DateValue>(),
    currency: z.enum(Currency),
    method: z.enum(ExpenseMethod),
    upload: z.string().optional(),
    memo: z.string().optional(),
    file: z.instanceof(File).optional(),
    category: z.string().optional(),
});
