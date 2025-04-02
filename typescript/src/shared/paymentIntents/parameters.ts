import {z} from 'zod';
import type {Context} from '@/shared/configuration';

export const listPaymentIntentsParameters = (
  context: Context = {}
): z.AnyZodObject => {
  const schema = z.object({
    customer: z
      .string()
      .optional()
      .describe('The ID of the customer to list payment intents for.'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe(
        'A limit on the number of objects to be returned. Limit can range between 1 and 100.'
      ),
  });

  if (context.customer) {
    return schema.omit({customer: true});
  } else {
    return schema;
  }
};
