import {z} from 'zod';
import type {Context} from '../configuration';

export const createProductParameters = (_context: Context = {}) =>
  z.object({
    name: z.string().describe('The name of the product.'),
    description: z
      .string()
      .optional()
      .describe('The description of the product.'),
  });

export const listProductsParameters = (
  _context: Context = {}
): z.AnyZodObject =>
  z.object({
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
