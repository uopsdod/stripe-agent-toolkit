import {z} from 'zod';
import type {Context} from '../configuration';

export const createCustomerParameters = (
  _context: Context = {}
): z.AnyZodObject =>
  z.object({
    name: z.string().describe('The name of the customer'),
    email: z.string().email().optional().describe('The email of the customer'),
  });

export const listCustomersParameters = (_context: Context = {}) =>
  z.object({
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe(
        'A limit on the number of objects to be returned. Limit can range between 1 and 100.'
      ),
    email: z
      .string()
      .optional()
      .describe(
        "A case-sensitive filter on the list based on the customer's email field. The value must be a string."
      ),
  });
