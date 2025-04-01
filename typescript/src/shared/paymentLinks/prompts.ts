import type {Context} from '../configuration';

export const createPaymentLinkPrompt = (_context: Context = {}) => `
This tool will create a payment link in Stripe.

It takes two arguments:
- price (str): The ID of the price to create the payment link for.
- quantity (int): The quantity of the product to include in the payment link.
`;
