import Stripe from 'stripe';
import {z} from 'zod';
import type {Context} from '@/shared/configuration';
import {createRefundParameters} from './parameters';

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
