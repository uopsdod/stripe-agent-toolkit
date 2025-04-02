import {z} from 'zod';
import type {Context} from '@/shared/configuration';

export const createInvoiceItemParameters = (
  context: Context = {}
): z.AnyZodObject => {
  const schema = z.object({
    customer: z
      .string()
      .describe('The ID of the customer to create the invoice item for.'),
    price: z.string().describe('The ID of the price for the item.'),
    invoice: z
      .string()
      .describe('The ID of the invoice to create the item for.'),
  });

  if (context.customer) {
    return schema.omit({customer: true});
  } else {
    return schema;
  }
};
