import {z} from 'zod';
import type {Context} from '../configuration';

export const createRefundParameters = (
  _context: Context = {}
): z.AnyZodObject =>
  z.object({
    payment_intent: z
      .string()
      .describe('The ID of the PaymentIntent to refund.'),
    amount: z
      .number()
      .int()
      .optional()
      .describe('The amount to refund in cents.'),
  });
