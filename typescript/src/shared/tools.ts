import {z} from 'zod';

import {createCustomerPrompt, listCustomersPrompt} from './customers/prompts';
import {createProductPrompt, listProductsPrompt} from './products/prompts';
import {createPricePrompt, listPricesPrompt} from './prices/prompts';
import {createPaymentLinkPrompt} from './paymentLinks/prompts';
import {
  createInvoicePrompt,
  listInvoicesPrompt,
  createInvoiceItemPrompt,
  finalizeInvoicePrompt,
} from './invoices/prompts';
import {retrieveBalancePrompt} from './balance/prompts';
import {createRefundPrompt} from './refunds/prompts';
import {searchDocumentationPrompt} from './documentation/prompts';
import {listPaymentIntentsPrompt} from './paymentIntents/prompts';

import {
  createCustomerParameters,
  listCustomersParameters,
} from './customers/parameters';
import {
  createProductParameters,
  listProductsParameters,
} from './products/parameters';
import {createPriceParameters, listPricesParameters} from './prices/parameters';
import {createPaymentLinkParameters} from './paymentLinks/parameters';
import {
  createInvoiceParameters,
  listInvoicesParameters,
  createInvoiceItemParameters,
  finalizeInvoiceParameters,
} from './invoices/parameters';
import {retrieveBalanceParameters} from './balance/parameters';
import {createRefundParameters} from './refunds/parameters';
import {searchDocumentationParameters} from './documentation/parameters';
import {listPaymentIntentsParameters} from './paymentIntents/parameters';

import type {Context} from './configuration';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  actions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
};

const tools = (context: Context): Tool[] => [
  {
    method: 'create_customer',
    name: 'Create Customer',
    description: createCustomerPrompt(context),
    parameters: createCustomerParameters(context),
    actions: {
      customers: {
        create: true,
      },
    },
  },
  {
    method: 'list_customers',
    name: 'List Customers',
    description: listCustomersPrompt(context),
    parameters: listCustomersParameters(context),
    actions: {
      customers: {
        read: true,
      },
    },
  },
  {
    method: 'create_product',
    name: 'Create Product',
    description: createProductPrompt(context),
    parameters: createProductParameters(context),
    actions: {
      products: {
        create: true,
      },
    },
  },
  {
    method: 'list_products',
    name: 'List Products',
    description: listProductsPrompt(context),
    parameters: listProductsParameters(context),
    actions: {
      products: {
        read: true,
      },
    },
  },
  {
    method: 'create_price',
    name: 'Create Price',
    description: createPricePrompt(context),
    parameters: createPriceParameters(context),
    actions: {
      prices: {
        create: true,
      },
    },
  },
  {
    method: 'list_prices',
    name: 'List Prices',
    description: listPricesPrompt(context),
    parameters: listPricesParameters(context),
    actions: {
      prices: {
        read: true,
      },
    },
  },
  {
    method: 'create_payment_link',
    name: 'Create Payment Link',
    description: createPaymentLinkPrompt(context),
    parameters: createPaymentLinkParameters(context),
    actions: {
      paymentLinks: {
        create: true,
      },
    },
  },
  {
    method: 'create_invoice',
    name: 'Create Invoice',
    description: createInvoicePrompt(context),
    parameters: createInvoiceParameters(context),
    actions: {
      invoices: {
        create: true,
      },
    },
  },
  {
    method: 'list_invoices',
    name: 'List Invoices',
    description: listInvoicesPrompt(context),
    parameters: listInvoicesParameters(context),
    actions: {
      invoices: {
        read: true,
      },
    },
  },
  {
    method: 'create_invoice_item',
    name: 'Create Invoice Item',
    description: createInvoiceItemPrompt(context),
    parameters: createInvoiceItemParameters(context),
    actions: {
      invoiceItems: {
        create: true,
      },
    },
  },
  {
    method: 'finalize_invoice',
    name: 'Finalize Invoice',
    description: finalizeInvoicePrompt(context),
    parameters: finalizeInvoiceParameters(context),
    actions: {
      invoices: {
        update: true,
      },
    },
  },
  {
    method: 'retrieve_balance',
    name: 'Retrieve Balance',
    description: retrieveBalancePrompt(context),
    parameters: retrieveBalanceParameters(context),
    actions: {
      balance: {
        read: true,
      },
    },
  },
  {
    method: 'create_refund',
    name: 'Create Refund',
    description: createRefundPrompt(context),
    parameters: createRefundParameters(context),
    actions: {
      refunds: {
        create: true,
      },
    },
  },
  {
    method: 'list_payment_intents',
    name: 'List Payment Intents',
    description: listPaymentIntentsPrompt(context),
    parameters: listPaymentIntentsParameters(context),
    actions: {
      paymentIntents: {
        read: true,
      },
    },
  },
  {
    method: 'search_documentation',
    name: 'Search Documentation',
    description: searchDocumentationPrompt(context),
    parameters: searchDocumentationParameters(context),
    actions: {
      documentation: {
        read: true,
      },
    },
  },
];

export default tools;
