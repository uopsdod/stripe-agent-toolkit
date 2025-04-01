import type {Context} from '../configuration';

export const listPaymentIntentsPrompt = (context: Context = {}) => {
  const customerArg = context.customer
    ? ''
    : `- customer (str, optional): The ID of the customer to list payment intents for.\n`;

  return `
This tool will list payment intents in Stripe.

It takes ${context.customer ? 'one' : 'two'} argument${context.customer ? '' : 's'}:
${customerArg}
- limit (int, optional): The number of payment intents to return.
`;
};
