import Stripe from 'stripe';
import {z} from 'zod';
import type {Context} from '@/shared/configuration';
import {listSubscriptionsParameters} from './parameters';

export const listSubscriptions = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof listSubscriptionsParameters>>
) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }

    const subscriptions = await stripe.subscriptions.list(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return subscriptions.data;
  } catch (error) {
    return 'Failed to list subscriptions';
  }
};
