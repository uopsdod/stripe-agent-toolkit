import type {Context} from '@/shared/configuration';

export const createProductPrompt = (_context: Context = {}) => `
This tool will create a product in Stripe.

It takes two arguments:
- name (str): The name of the product.
- description (str, optional): The description of the product.
`;

export const listProductsPrompt = (_context: Context = {}) => `
This tool will fetch a list of Products from Stripe.

It takes one optional argument:
- limit (int, optional): The number of products to return.
`;
