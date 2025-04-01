import type {Context} from '@/shared/configuration';

export const retrieveBalancePrompt = (_context: Context = {}) => `
This tool will retrieve the balance from Stripe. It takes no input.
`;
