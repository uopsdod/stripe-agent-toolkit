import {
  createCustomerPrompt,
  listCustomersPrompt,
  createProductPrompt,
  listProductsPrompt,
  createPricePrompt,
  listPricesPrompt,
  createPaymentLinkPrompt,
  createInvoicePrompt,
  createInvoiceItemPrompt,
  finalizeInvoicePrompt,
  retrieveBalancePrompt,
} from './prompts';

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

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: any;
  actions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
};

const tools: Tool[] = [
  {
    method: 'createCustomer',
    name: 'Create Customer',
    description: createCustomerPrompt,
    parameters: createCustomerParameters,
    actions: {
      customers: {
        create: true,
      },
    },
  },
  {
    method: 'listCustomers',
    name: 'List Customers',
    description: listCustomersPrompt,
    parameters: listCustomersParameters,
    actions: {
      customers: {
        read: true,
      },
    },
  },
  {
    method: 'createProduct',
    name: 'Create Product',
    description: createProductPrompt,
    parameters: createProductParameters,
    actions: {
      products: {
        create: true,
      },
    },
  },
  {
    method: 'listProducts',
    name: 'List Products',
    description: listProductsPrompt,
    parameters: listProductsParameters,
    actions: {
      products: {
        read: true,
      },
    },
  },
  {
    method: 'createPrice',
    name: 'Create Price',
    description: createPricePrompt,
    parameters: createPriceParameters,
    actions: {
      prices: {
        create: true,
      },
    },
  },
  {
    method: 'listPrices',
    name: 'List Prices',
    description: listPricesPrompt,
    parameters: listPricesParameters,
    actions: {
      prices: {
        read: true,
      },
    },
  },
  {
    method: 'createPaymentLink',
    name: 'Create Payment Link',
    description: createPaymentLinkPrompt,
    parameters: createPaymentLinkParameters,
    actions: {
      paymentLinks: {
        create: true,
      },
    },
  },
  {
    method: 'createInvoice',
    name: 'Create Invoice',
    description: createInvoicePrompt,
    parameters: createInvoiceParameters,
    actions: {
      invoices: {
        create: true,
      },
    },
  },
  {
    method: 'createInvoiceItem',
    name: 'Create Invoice Item',
    description: createInvoiceItemPrompt,
    parameters: createInvoiceItemParameters,
    actions: {
      invoiceItems: {
        create: true,
      },
    },
  },
  {
    method: 'finalizeInvoice',
    name: 'Finalize Invoice',
    description: finalizeInvoicePrompt,
    parameters: finalizeInvoiceParameters,
    actions: {
      invoices: {
        update: true,
      },
    },
  },
  {
    method: 'retrieveBalance',
    name: 'Retrieve Balance',
    description: retrieveBalancePrompt,
    parameters: retrieveBalanceParameters,
    actions: {
      balance: {
        read: true,
      },
    },
  },
];

export default tools;
