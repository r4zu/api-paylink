import { z } from 'zod';

export const paymentSchema = z.object({
  email: z.string().email(),
  amount: z.number(),
  billingAddress: z.object({
    fullName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    phone: z.string(),
  }),
  paymentInformation: z.object({
    nameOnCard: z.string(),
    cardNumber: z.string(),
    expiration: z.string(),
    cvv: z.string(),
  }),
});

export type Payment = z.infer<typeof paymentSchema>;
