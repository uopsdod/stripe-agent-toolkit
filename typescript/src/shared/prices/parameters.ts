import {z} from 'zod';
import type {Context} from '@/shared/configuration';

export const createPriceParameters = (_context: Context = {}) =>
  z.object({
    product: z
      .string()
      .describe('The ID of the product to create the price for.'),
    unit_amount: z
      .number()
      .int()
      .describe('The unit amount of the price in cents.'),
    currency: z.string().describe('The currency of the price.'),
  });

export const listPricesParameters = (_context: Context = {}): z.AnyZodObject =>
  z.object({
    product: z
      .string()
      .optional()
      .describe('The ID of the product to list prices for.'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe(
        'A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.'
      ),
  });
