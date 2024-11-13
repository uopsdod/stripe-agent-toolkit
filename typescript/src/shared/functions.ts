import Stripe from 'stripe';
import {z} from 'zod';
import {
  createCustomerParameters,
  listCustomersParameters,
  createProductParameters,
  listProductsParameters,
  createPriceParameters,
  listPricesParameters,
  createPaymentLinkParameters,
  createInvoiceParameters,
  createInvoiceItemParameters,
  finalizeInvoiceParameters,
  retrieveBalanceParameters,
} from './parameters';

export const createCustomer = async (
  stripe: Stripe,
  params: z.infer<typeof createCustomerParameters>
) => {
  try {
    const customer = await stripe.customers.create(params);
    return {id: customer.id};
  } catch (error) {
    return 'Failed to create customer';
  }
};

export const listCustomers = async (
  stripe: Stripe,
  params: z.infer<typeof listCustomersParameters>
) => {
  try {
    const customers = await stripe.customers.list(params);
    return customers.data.map((customer) => ({id: customer.id}));
  } catch (error) {
    return 'Failed to list customers';
  }
};

export const createProduct = async (
  stripe: Stripe,
  params: z.infer<typeof createProductParameters>
) => {
  try {
    const product = await stripe.products.create(params);
    return product;
  } catch (error) {
    return 'Failed to create product';
  }
};

export const listProducts = async (
  stripe: Stripe,
  params: z.infer<typeof listProductsParameters>
) => {
  try {
    const products = await stripe.products.list(params);
    return products.data;
  } catch (error) {
    return 'Failed to list products';
  }
};

export const createPrice = async (
  stripe: Stripe,
  params: z.infer<typeof createPriceParameters>
) => {
  try {
    const price = await stripe.prices.create(params);
    return price;
  } catch (error) {
    return 'Failed to create price';
  }
};

export const listPrices = async (
  stripe: Stripe,
  params: z.infer<typeof listPricesParameters>
) => {
  try {
    const prices = await stripe.prices.list(params);
    return prices.data;
  } catch (error) {
    return 'Failed to list prices';
  }
};

export const createPaymentLink = async (
  stripe: Stripe,
  params: z.infer<typeof createPaymentLinkParameters>
) => {
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [params],
    });
    return {id: paymentLink.id, url: paymentLink.url};
  } catch (error) {
    return 'Failed to create payment link';
  }
};

export const createInvoice = async (
  stripe: Stripe,
  params: z.infer<typeof createInvoiceParameters>
) => {
  try {
    const invoice = await stripe.invoices.create(params);
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

export const createInvoiceItem = async (
  stripe: Stripe,
  params: z.infer<typeof createInvoiceItemParameters>
) => {
  try {
    const invoiceItem = await stripe.invoiceItems.create(params);
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
  params: z.infer<typeof finalizeInvoiceParameters>
) => {
  try {
    const invoice = await stripe.invoices.finalizeInvoice(params.invoice);
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

export const retrieveBalance = async (
  stripe: Stripe,
  params: z.infer<typeof retrieveBalanceParameters>
) => {
  try {
    const balance = await stripe.balance.retrieve(params);
    return balance;
  } catch (error) {
    return 'Failed to retrieve balance';
  }
};
