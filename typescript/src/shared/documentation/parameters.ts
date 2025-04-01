import {z} from 'zod';
import type {Context} from '../configuration';

export const searchDocumentationParameters = (
  _context: Context = {}
): z.AnyZodObject =>
  z.object({
    question: z
      .string()
      .describe(
        'The user question about integrating with Stripe will be used to search the documentation.'
      ),
    language: z
      .enum(['dotnet', 'go', 'java', 'node', 'php', 'ruby', 'python', 'curl'])
      .optional()
      .describe(
        'The programming language to search for in the the documentation.'
      ),
  });
