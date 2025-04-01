import Stripe from 'stripe';
import {z} from 'zod';
import {
  createInvoiceParameters,
  listInvoicesParameters,
  createInvoiceItemParameters,
  finalizeInvoiceParameters,
} from './parameters';
import type {Context} from '../configuration';

export const createInvoice = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof createInvoiceParameters>>
) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }

    const invoice = await stripe.invoices.create(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return {
      id: invoice.id,
      url: invoice.hosted_invoice_url,
      customer: invoice.customer,
      status: invoice.status,
    };
  } catch (error) {
    return 'Failed to create invoice';
  }
};

export const listInvoices = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof listInvoicesParameters>>
) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }

    const invoices = await stripe.invoices.list(
      params,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return invoices.data;
  } catch (error) {
    return 'Failed to list invoices';
  }
};

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

export const finalizeInvoice = async (
  stripe: Stripe,
  context: Context,
  params: z.infer<ReturnType<typeof finalizeInvoiceParameters>>
) => {
  try {
    const invoice = await stripe.invoices.finalizeInvoice(
      params.invoice,
      context.account ? {stripeAccount: context.account} : undefined
    );

    return {
      id: invoice.id,
      url: invoice.hosted_invoice_url,
      customer: invoice.customer,
      status: invoice.status,
    };
  } catch (error) {
    return 'Failed to finalize invoice';
  }
};
