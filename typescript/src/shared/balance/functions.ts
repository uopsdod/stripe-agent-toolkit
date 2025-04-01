import Stripe from 'stripe';
import {z} from 'zod';
import type {Context} from '@/shared/configuration';
import {retrieveBalanceParameters} from './parameters';

export const retrieveBalance = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof retrieveBalanceParameters>>
) => {
  try {
    const balance = await stripe.balance.retrieve(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return balance;
  } catch (error) {
    return 'Failed to retrieve balance';
  }
};
