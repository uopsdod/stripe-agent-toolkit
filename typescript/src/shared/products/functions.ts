import Stripe from 'stripe';
import {z} from 'zod';
import {createProductParameters, listProductsParameters} from './parameters';
import type {Context} from '../configuration';

export const createProduct = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createProductParameters>>
) => {
  try {
    const product = await stripe.products.create(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return product;
  } catch (error) {
    return 'Failed to create product';
  }
};

export const listProducts = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof listProductsParameters>>
) => {
  try {
    const products = await stripe.products.list(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return products.data;
  } catch (error) {
    return 'Failed to list products';
  }
};
