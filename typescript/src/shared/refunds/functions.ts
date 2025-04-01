import Stripe from 'stripe';
import {z} from 'zod';
import {createRefundParameters} from './parameters';
import type {Context} from '../configuration';

export const createRefund = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createRefundParameters>>
) => {
  try {
    const refund = await stripe.refunds.create(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return {
      id: refund.id,
      status: refund.status,
      amount: refund.amount,
    };
  } catch (error) {
    return 'Failed to create refund';
  }
};
