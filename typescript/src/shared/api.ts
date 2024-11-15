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
        version: '0.1.21',
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
    if (method === 'create_customer') {
      const output = JSON.stringify(await createCustomer(this.stripe, arg));
      return output;
    } else if (method === 'list_customers') {
      const output = JSON.stringify(await listCustomers(this.stripe, arg));
      return output;
    } else if (method === 'create_product') {
      const output = JSON.stringify(await createProduct(this.stripe, arg));
      return output;
    } else if (method === 'list_products') {
      const output = JSON.stringify(await listProducts(this.stripe, arg));
      return output;
    } else if (method === 'create_price') {
      const output = JSON.stringify(await createPrice(this.stripe, arg));
      return output;
    } else if (method === 'list_prices') {
      const output = JSON.stringify(await listPrices(this.stripe, arg));
      return output;
    } else if (method === 'create_payment_link') {
      const output = JSON.stringify(await createPaymentLink(this.stripe, arg));
      return output;
    } else if (method === 'create_invoice') {
      const output = JSON.stringify(await createInvoice(this.stripe, arg));
      return output;
    } else if (method === 'create_invoice_item') {
      const output = JSON.stringify(await createInvoiceItem(this.stripe, arg));
      return output;
    } else if (method === 'finalize_invoice') {
      const output = JSON.stringify(await finalizeInvoice(this.stripe, arg));
      return output;
    } else if (method === 'retrieve_balance') {
      const output = JSON.stringify(await retrieveBalance(this.stripe, arg));
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}

export default StripeAPI;
