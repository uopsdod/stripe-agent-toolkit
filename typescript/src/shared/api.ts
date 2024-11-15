import Stripe from 'stripe';
import {
  createCustomer,
  listCustomers,
  createProduct,
  listProducts,
  createPrice,
  listPrices,
  createPaymentLink,
  createInvoice,
  createInvoiceItem,
  finalizeInvoice,
  retrieveBalance,
} from './functions';

class StripeAPI {
  stripe: Stripe;

  constructor(secretKey: string) {
    const stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: 'stripe-agent-toolkit-typescript',
        version: '0.1.20',
        url: 'https://github.com/stripe/agent-toolkit',
      },
    });
    this.stripe = stripeClient;
  }

  async createMeterEvent({
    event,
    customer,
    value,
  }: {
    event: string;
    customer: string;
    value: string;
  }) {
    await this.stripe.billing.meterEvents.create({
      event_name: event,
      payload: {
        stripe_customer_id: customer,
        value: value,
      },
    });
  }

  async run(method: string, arg: any) {
    if (method === 'createCustomer') {
      const output = JSON.stringify(await createCustomer(this.stripe, arg));
      return output;
    } else if (method === 'listCustomers') {
      const output = JSON.stringify(await listCustomers(this.stripe, arg));
      return output;
    } else if (method === 'createProduct') {
      const output = JSON.stringify(await createProduct(this.stripe, arg));
      return output;
    } else if (method === 'listProducts') {
      const output = JSON.stringify(await listProducts(this.stripe, arg));
      return output;
    } else if (method === 'createPrice') {
      const output = JSON.stringify(await createPrice(this.stripe, arg));
      return output;
    } else if (method === 'listPrices') {
      const output = JSON.stringify(await listPrices(this.stripe, arg));
      return output;
    } else if (method === 'createPaymentLink') {
      const output = JSON.stringify(await createPaymentLink(this.stripe, arg));
      return output;
    } else if (method === 'createInvoice') {
      const output = JSON.stringify(await createInvoice(this.stripe, arg));
      return output;
    } else if (method === 'createInvoiceItem') {
      const output = JSON.stringify(await createInvoiceItem(this.stripe, arg));
      return output;
    } else if (method === 'finalizeInvoice') {
      const output = JSON.stringify(await finalizeInvoice(this.stripe, arg));
      return output;
    } else if (method === 'retrieveBalance') {
      const output = JSON.stringify(await retrieveBalance(this.stripe, arg));
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}

export default StripeAPI;
