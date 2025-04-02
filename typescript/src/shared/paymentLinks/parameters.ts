import {z} from 'zod';
import type {Context} from '@/shared/configuration';

export const createPaymentLinkParameters = (_context: Context = {}) =>
  z.object({
    price: z
      .string()
      .describe('The ID of the price to create the payment link for.'),
    quantity: z
      .number()
      .int()
      .describe('The quantity of the product to include.'),
  });
