import type {Context} from '@/shared/configuration';

export const createCustomerPrompt = (_context: Context = {}) => `
This tool will create a customer in Stripe.

It takes two arguments:
- name (str): The name of the customer.
- email (str, optional): The email of the customer.
`;

export const listCustomersPrompt = (_context: Context = {}) => `
This tool will fetch a list of Customers from Stripe.

It takes no input.
`;
