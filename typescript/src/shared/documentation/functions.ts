import Stripe from 'stripe';
import {z} from 'zod';
import type {Context} from '@/shared/configuration';
import {searchDocumentationParameters} from './parameters';

export const searchDocumentation = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof searchDocumentationParameters>>
) => {
  try {
    const endpoint = 'https://ai.stripe.com/search';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'fetch',
      },
      body: JSON.stringify(params),
    });

    // If status not in 200-299 range, throw error
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.sources;
  } catch (error) {
    console.error('Error searching documentation:', error);
    return 'Failed to search documentation';
  }
};
