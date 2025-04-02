import Stripe from 'stripe';
import {z} from 'zod';
import type {Context} from '@/shared/configuration';
import {createInvoiceItemParameters} from './parameters';

export const createInvoiceItem = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createInvoiceItemParameters>>
) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }

    const invoiceItem = await stripe.invoiceItems.create(
      // @ts-ignore
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return {
      id: invoiceItem.id,
      invoice: invoiceItem.invoice,
    };
  } catch (error) {
    return 'Failed to create invoice item';
  }
};
