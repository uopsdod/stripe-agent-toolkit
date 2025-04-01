import Stripe from 'stripe';
import {z} from 'zod';
import {createPaymentLinkParameters} from './parameters';
import type {Context} from '../configuration';

export const createPaymentLink = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createPaymentLinkParameters>>
) => {
  try {
    const paymentLink = await stripe.paymentLinks.create(
      {
        line_items: [params],
      },
      context.account ? {stripeAccount: context.account} : undefined
    );

    return {id: paymentLink.id, url: paymentLink.url};
  } catch (error) {
    return 'Failed to create payment link';
  }
};
