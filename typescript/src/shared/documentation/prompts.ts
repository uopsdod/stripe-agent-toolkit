import type {Context} from '@/shared/configuration';

export const searchDocumentationPrompt = (_context: Context = {}) => `
This tool will take in a user question about integrating with Stripe in their application, then search and retrieve relevant Stripe documentation to answer the question.

It takes two arguments:
- question (str): The user question to search an answer for in the Stripe documentation.
- language (str, optional): The programming language to search for in the the documentation.
`;
