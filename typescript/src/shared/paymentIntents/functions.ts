import Stripe from 'stripe';
import {z} from 'zod';
import {listPaymentIntentsParameters} from './parameters';
import type {Context} from '../configuration';

export const listPaymentIntents = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof listPaymentIntentsParameters>>
) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }

    const paymentIntents = await stripe.paymentIntents.list(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return paymentIntents.data;
  } catch (error) {
    return 'Failed to list payment intents';
  }
};
