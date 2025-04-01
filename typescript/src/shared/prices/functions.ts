import Stripe from 'stripe';
import {z} from 'zod';
import {createPriceParameters, listPricesParameters} from './parameters';
import type {Context} from '../configuration';

export const createPrice = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createPriceParameters>>
) => {
  try {
    const price = await stripe.prices.create(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return price;
  } catch (error) {
    return 'Failed to create price';
  }
};

export const listPrices = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof listPricesParameters>>
) => {
  try {
    const prices = await stripe.prices.list(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return prices.data;
  } catch (error) {
    return 'Failed to list prices';
  }
};
