// src/modelcontextprotocol/toolkit.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// src/shared/configuration.ts
var isToolAllowed = (tool, configuration) => {
  return Object.keys(tool.actions).every((resource) => {
    const permissions = tool.actions[resource];
    return Object.keys(permissions).every((permission) => {
      return configuration.actions[resource]?.[permission] === true;
    });
  });
};

// src/shared/api.ts
import Stripe from "stripe";

// src/shared/customers/functions.ts
var createCustomer = async (stripe, context, params) => {
  try {
    const customer = await stripe.customers.create(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return { id: customer.id };
  } catch (error) {
    return "Failed to create customer";
  }
};
var listCustomers = async (stripe, context, params) => {
  try {
    const customers = await stripe.customers.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return customers.data.map((customer) => ({
      id: customer.id,
      email: customer.email,
      name: customer.name
    }));
  } catch (error) {
    return "Failed to list customers";
  }
};

// src/shared/products/functions.ts
var createProduct = async (stripe, context, params) => {
  try {
    const product = await stripe.products.create(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return product;
  } catch (error) {
    return "Failed to create product";
  }
};
var listProducts = async (stripe, context, params) => {
  try {
    const products = await stripe.products.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return products.data;
  } catch (error) {
    return "Failed to list products";
  }
};

// src/shared/prices/functions.ts
var createPrice = async (stripe, context, params) => {
  try {
    const price = await stripe.prices.create(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return price;
  } catch (error) {
    return "Failed to create price";
  }
};
var listPrices = async (stripe, context, params) => {
  try {
    const prices = await stripe.prices.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return prices.data;
  } catch (error) {
    return "Failed to list prices";
  }
};

// src/shared/paymentLinks/functions.ts
var createPaymentLink = async (stripe, context, params) => {
  try {
    const paymentLink = await stripe.paymentLinks.create(
      {
        line_items: [params]
      },
      context.account ? { stripeAccount: context.account } : void 0
    );
    return { id: paymentLink.id, url: paymentLink.url };
  } catch (error) {
    return "Failed to create payment link";
  }
};

// src/shared/invoices/functions.ts
var createInvoice = async (stripe, context, params) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }
    const invoice = await stripe.invoices.create(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return {
      id: invoice.id,
      url: invoice.hosted_invoice_url,
      customer: invoice.customer,
      status: invoice.status
    };
  } catch (error) {
    return "Failed to create invoice";
  }
};
var listInvoices = async (stripe, context, params) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }
    const invoices = await stripe.invoices.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return invoices.data;
  } catch (error) {
    return "Failed to list invoices";
  }
};
var finalizeInvoice = async (stripe, context, params) => {
  try {
    const invoice = await stripe.invoices.finalizeInvoice(
      params.invoice,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return {
      id: invoice.id,
      url: invoice.hosted_invoice_url,
      customer: invoice.customer,
      status: invoice.status
    };
  } catch (error) {
    return "Failed to finalize invoice";
  }
};

// src/shared/invoiceItems/functions.ts
var createInvoiceItem = async (stripe, context, params) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }
    const invoiceItem = await stripe.invoiceItems.create(
      // @ts-ignore
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return {
      id: invoiceItem.id,
      invoice: invoiceItem.invoice
    };
  } catch (error) {
    return "Failed to create invoice item";
  }
};

// src/shared/balance/functions.ts
var retrieveBalance = async (stripe, context, params) => {
  try {
    const balance = await stripe.balance.retrieve(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return balance;
  } catch (error) {
    return "Failed to retrieve balance";
  }
};

// src/shared/refunds/functions.ts
var createRefund = async (stripe, context, params) => {
  try {
    const refund = await stripe.refunds.create(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return {
      id: refund.id,
      status: refund.status,
      amount: refund.amount
    };
  } catch (error) {
    return "Failed to create refund";
  }
};

// src/shared/documentation/functions.ts
var searchDocumentation = async (stripe, context, params) => {
  try {
    const endpoint = "https://ai.stripe.com/search";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "fetch",
        "User-Agent": context.mode === "modelcontextprotocol" ? "stripe-mcp" : "stripe-agent-toolkit-typescript"
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data?.sources;
  } catch (error) {
    return "Failed to search documentation";
  }
};

// src/shared/paymentIntents/functions.ts
var listPaymentIntents = async (stripe, context, params) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }
    const paymentIntents = await stripe.paymentIntents.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return paymentIntents.data;
  } catch (error) {
    return "Failed to list payment intents";
  }
};

// src/shared/subscriptions/functions.ts
var listSubscriptions = async (stripe, context, params) => {
  try {
    if (context.customer) {
      params.customer = context.customer;
    }
    const subscriptions = await stripe.subscriptions.list(
      params,
      context.account ? { stripeAccount: context.account } : void 0
    );
    return subscriptions.data;
  } catch (error) {
    return "Failed to list subscriptions";
  }
};

// src/shared/api.ts
var TOOLKIT_HEADER = "stripe-agent-toolkit-typescript";
var MCP_HEADER = "stripe-mcp";
var StripeAPI = class {
  stripe;
  context;
  constructor(secretKey, context) {
    const stripeClient = new Stripe(secretKey, {
      appInfo: {
        name: context?.mode === "modelcontextprotocol" ? MCP_HEADER : TOOLKIT_HEADER,
        version: "0.5.3",
        url: "https://github.com/stripe/agent-toolkit"
      }
    });
    this.stripe = stripeClient;
    this.context = context || {};
  }
  async createMeterEvent({
    event,
    customer,
    value
  }) {
    await this.stripe.billing.meterEvents.create(
      {
        event_name: event,
        payload: {
          stripe_customer_id: customer,
          value
        }
      },
      this.context.account ? { stripeAccount: this.context.account } : void 0
    );
  }
  async run(method, arg) {
    if (method === "create_customer") {
      const output = JSON.stringify(
        await createCustomer(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_customers") {
      const output = JSON.stringify(
        await listCustomers(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_product") {
      const output = JSON.stringify(
        await createProduct(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_products") {
      const output = JSON.stringify(
        await listProducts(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_price") {
      const output = JSON.stringify(
        await createPrice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_prices") {
      const output = JSON.stringify(
        await listPrices(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_payment_link") {
      const output = JSON.stringify(
        await createPaymentLink(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_invoice") {
      const output = JSON.stringify(
        await createInvoice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_invoices") {
      const output = JSON.stringify(
        await listInvoices(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_invoice_item") {
      const output = JSON.stringify(
        await createInvoiceItem(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "finalize_invoice") {
      const output = JSON.stringify(
        await finalizeInvoice(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "retrieve_balance") {
      const output = JSON.stringify(
        await retrieveBalance(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "create_refund") {
      const output = JSON.stringify(
        await createRefund(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_payment_intents") {
      const output = JSON.stringify(
        await listPaymentIntents(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "list_subscriptions") {
      const output = JSON.stringify(
        await listSubscriptions(this.stripe, this.context, arg)
      );
      return output;
    } else if (method === "search_documentation") {
      const output = JSON.stringify(
        await searchDocumentation(this.stripe, this.context, arg)
      );
      return output;
    } else {
      throw new Error("Invalid method " + method);
    }
  }
};
var api_default = StripeAPI;

// src/shared/customers/prompts.ts
var createCustomerPrompt = (_context = {}) => `
This tool will create a customer in Stripe.

It takes two arguments:
- name (str): The name of the customer.
- email (str, optional): The email of the customer.
`;
var listCustomersPrompt = (_context = {}) => `
This tool will fetch a list of Customers from Stripe.

It takes no input.
`;

// src/shared/products/prompts.ts
var createProductPrompt = (_context = {}) => `
This tool will create a product in Stripe.

It takes two arguments:
- name (str): The name of the product.
- description (str, optional): The description of the product.
`;
var listProductsPrompt = (_context = {}) => `
This tool will fetch a list of Products from Stripe.

It takes one optional argument:
- limit (int, optional): The number of products to return.
`;

// src/shared/prices/prompts.ts
var createPricePrompt = (_context = {}) => `
This tool will create a price in Stripe. If a product has not already been specified, a product should be created first.

It takes three arguments:
- product (str): The ID of the product to create the price for.
- unit_amount (int): The unit amount of the price in cents.
- currency (str): The currency of the price.
`;
var listPricesPrompt = (_context = {}) => `
This tool will fetch a list of Prices from Stripe.

It takes two arguments.
- product (str, optional): The ID of the product to list prices for.
- limit (int, optional): The number of prices to return.
`;

// src/shared/paymentLinks/prompts.ts
var createPaymentLinkPrompt = (_context = {}) => `
This tool will create a payment link in Stripe.

It takes two arguments:
- price (str): The ID of the price to create the payment link for.
- quantity (int): The quantity of the product to include in the payment link.
`;

// src/shared/invoices/prompts.ts
var createInvoicePrompt = (context = {}) => {
  const customerArg = context.customer ? "" : `- customer (str): The ID of the customer to create the invoice for.
`;
  return `
This tool will create an invoice in Stripe.

It takes ${context.customer ? "one" : "two"} argument${context.customer ? "" : "s"}:
${customerArg}
- days_until_due (int, optional): The number of days until the invoice is due.
`;
};
var listInvoicesPrompt = (context = {}) => {
  const customerArg = context.customer ? "" : `- customer (str, optional): The ID of the customer to list invoices for.
`;
  return `
This tool will fetch a list of Invoices from Stripe.

It takes ${context.customer ? "one" : "two"} argument${context.customer ? "" : "s"}:
${customerArg}
- limit (int, optional): The number of invoices to return.
`;
};
var finalizeInvoicePrompt = (_context = {}) => `
This tool will finalize an invoice in Stripe.

It takes one argument:
- invoice (str): The ID of the invoice to finalize.
`;

// src/shared/invoiceItems/prompts.ts
var createInvoiceItemPrompt = (context = {}) => {
  const customerArg = context.customer ? "" : `- customer (str): The ID of the customer to create the invoice item for.
`;
  return `
This tool will create an invoice item in Stripe.

It takes ${context.customer ? "one" : "two"} argument${context.customer ? "" : "s"}:
${customerArg}
- price (str): The ID of the price to create the invoice item for.
- invoice (str): The ID of the invoice to create the invoice item for.
`;
};

// src/shared/balance/prompts.ts
var retrieveBalancePrompt = (_context = {}) => `
This tool will retrieve the balance from Stripe. It takes no input.
`;

// src/shared/refunds/prompts.ts
var createRefundPrompt = (_context = {}) => `
This tool will refund a payment intent in Stripe.

It takes three arguments:
- payment_intent (str): The ID of the payment intent to refund.
- amount (int, optional): The amount to refund in cents.
- reason (str, optional): The reason for the refund.
`;

// src/shared/documentation/prompts.ts
var searchDocumentationPrompt = (_context = {}) => `
This tool will take in a user question about integrating with Stripe in their application, then search and retrieve relevant Stripe documentation to answer the question.

It takes two arguments:
- question (str): The user question to search an answer for in the Stripe documentation.
- language (str, optional): The programming language to search for in the the documentation.
`;

// src/shared/paymentIntents/prompts.ts
var listPaymentIntentsPrompt = (context = {}) => {
  const customerArg = context.customer ? "" : `- customer (str, optional): The ID of the customer to list payment intents for.
`;
  return `
This tool will list payment intents in Stripe.

It takes ${context.customer ? "one" : "two"} argument${context.customer ? "" : "s"}:
${customerArg}
- limit (int, optional): The number of payment intents to return.
`;
};

// src/shared/subscriptions/prompts.ts
var listSubscriptionsPrompt = (context = {}) => {
  const customerArg = context.customer ? "" : `- customer (str, optional): The ID of the customer to list subscriptions for.
`;
  return `
This tool will list all subscriptions in Stripe.

It takes ${context.customer ? "three" : "four"} arguments:
${customerArg}
- price (str, optional): The ID of the price to list subscriptions for.
- status (str, optional): The status of the subscriptions to list.
- limit (int, optional): The number of subscriptions to return.
`;
};

// src/shared/customers/parameters.ts
import { z } from "zod";
var createCustomerParameters = (_context = {}) => z.object({
  name: z.string().describe("The name of the customer"),
  email: z.string().email().optional().describe("The email of the customer")
});
var listCustomersParameters = (_context = {}) => z.object({
  limit: z.number().int().min(1).max(100).optional().describe(
    "A limit on the number of objects to be returned. Limit can range between 1 and 100."
  ),
  email: z.string().optional().describe(
    "A case-sensitive filter on the list based on the customer's email field. The value must be a string."
  )
});

// src/shared/products/parameters.ts
import { z as z2 } from "zod";
var createProductParameters = (_context = {}) => z2.object({
  name: z2.string().describe("The name of the product."),
  description: z2.string().optional().describe("The description of the product.")
});
var listProductsParameters = (_context = {}) => z2.object({
  limit: z2.number().int().min(1).max(100).optional().describe(
    "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."
  )
});

// src/shared/prices/parameters.ts
import { z as z3 } from "zod";
var createPriceParameters = (_context = {}) => z3.object({
  product: z3.string().describe("The ID of the product to create the price for."),
  unit_amount: z3.number().int().describe("The unit amount of the price in cents."),
  currency: z3.string().describe("The currency of the price.")
});
var listPricesParameters = (_context = {}) => z3.object({
  product: z3.string().optional().describe("The ID of the product to list prices for."),
  limit: z3.number().int().min(1).max(100).optional().describe(
    "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."
  )
});

// src/shared/paymentLinks/parameters.ts
import { z as z4 } from "zod";
var createPaymentLinkParameters = (_context = {}) => z4.object({
  price: z4.string().describe("The ID of the price to create the payment link for."),
  quantity: z4.number().int().describe("The quantity of the product to include.")
});

// src/shared/invoices/parameters.ts
import { z as z5 } from "zod";
var createInvoiceParameters = (context = {}) => {
  const schema = z5.object({
    customer: z5.string().describe("The ID of the customer to create the invoice for."),
    days_until_due: z5.number().int().optional().describe("The number of days until the invoice is due.")
  });
  if (context.customer) {
    return schema.omit({ customer: true });
  } else {
    return schema;
  }
};
var listInvoicesParameters = (context = {}) => {
  const schema = z5.object({
    customer: z5.string().optional().describe("The ID of the customer to list invoices for."),
    limit: z5.number().int().min(1).max(100).optional().describe(
      "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10."
    )
  });
  if (context.customer) {
    return schema.omit({ customer: true });
  } else {
    return schema;
  }
};
var finalizeInvoiceParameters = (_context = {}) => z5.object({
  invoice: z5.string().describe("The ID of the invoice to finalize.")
});

// src/shared/invoiceItems/parameters.ts
import { z as z6 } from "zod";
var createInvoiceItemParameters = (context = {}) => {
  const schema = z6.object({
    customer: z6.string().describe("The ID of the customer to create the invoice item for."),
    price: z6.string().describe("The ID of the price for the item."),
    invoice: z6.string().describe("The ID of the invoice to create the item for.")
  });
  if (context.customer) {
    return schema.omit({ customer: true });
  } else {
    return schema;
  }
};

// src/shared/balance/parameters.ts
import { z as z7 } from "zod";
var retrieveBalanceParameters = (_context = {}) => z7.object({});

// src/shared/refunds/parameters.ts
import { z as z8 } from "zod";
var createRefundParameters = (_context = {}) => z8.object({
  payment_intent: z8.string().describe("The ID of the PaymentIntent to refund."),
  amount: z8.number().int().optional().describe("The amount to refund in cents.")
});

// src/shared/documentation/parameters.ts
import { z as z9 } from "zod";
var searchDocumentationParameters = (_context = {}) => z9.object({
  question: z9.string().describe(
    "The user question about integrating with Stripe will be used to search the documentation."
  ),
  language: z9.enum(["dotnet", "go", "java", "node", "php", "ruby", "python", "curl"]).optional().describe(
    "The programming language to search for in the the documentation."
  )
});

// src/shared/paymentIntents/parameters.ts
import { z as z10 } from "zod";
var listPaymentIntentsParameters = (context = {}) => {
  const schema = z10.object({
    customer: z10.string().optional().describe("The ID of the customer to list payment intents for."),
    limit: z10.number().int().min(1).max(100).optional().describe(
      "A limit on the number of objects to be returned. Limit can range between 1 and 100."
    )
  });
  if (context.customer) {
    return schema.omit({ customer: true });
  } else {
    return schema;
  }
};

// src/shared/subscriptions/parameters.ts
import { z as z11 } from "zod";
var listSubscriptionsParameters = (context = {}) => {
  const schema = z11.object({
    customer: z11.string().optional().describe("The ID of the customer to list subscriptions for."),
    price: z11.string().optional().describe("The ID of the price to list subscriptions for."),
    status: z11.enum([
      "active",
      "past_due",
      "unpaid",
      "canceled",
      "incomplete",
      "incomplete_expired",
      "trialing",
      "all"
    ]).optional().describe("The status of the subscriptions to retrieve."),
    limit: z11.number().int().min(1).max(100).optional().describe(
      "A limit on the number of objects to be returned. Limit can range between 1 and 100."
    )
  });
  if (context.customer) {
    return schema.omit({ customer: true });
  } else {
    return schema;
  }
};

// src/shared/tools.ts
var tools = (context) => [
  {
    method: "create_customer",
    name: "Create Customer",
    description: createCustomerPrompt(context),
    parameters: createCustomerParameters(context),
    actions: {
      customers: {
        create: true
      }
    }
  },
  {
    method: "list_customers",
    name: "List Customers",
    description: listCustomersPrompt(context),
    parameters: listCustomersParameters(context),
    actions: {
      customers: {
        read: true
      }
    }
  },
  {
    method: "create_product",
    name: "Create Product",
    description: createProductPrompt(context),
    parameters: createProductParameters(context),
    actions: {
      products: {
        create: true
      }
    }
  },
  {
    method: "list_products",
    name: "List Products",
    description: listProductsPrompt(context),
    parameters: listProductsParameters(context),
    actions: {
      products: {
        read: true
      }
    }
  },
  {
    method: "create_price",
    name: "Create Price",
    description: createPricePrompt(context),
    parameters: createPriceParameters(context),
    actions: {
      prices: {
        create: true
      }
    }
  },
  {
    method: "list_prices",
    name: "List Prices",
    description: listPricesPrompt(context),
    parameters: listPricesParameters(context),
    actions: {
      prices: {
        read: true
      }
    }
  },
  {
    method: "create_payment_link",
    name: "Create Payment Link",
    description: createPaymentLinkPrompt(context),
    parameters: createPaymentLinkParameters(context),
    actions: {
      paymentLinks: {
        create: true
      }
    }
  },
  {
    method: "create_invoice",
    name: "Create Invoice",
    description: createInvoicePrompt(context),
    parameters: createInvoiceParameters(context),
    actions: {
      invoices: {
        create: true
      }
    }
  },
  {
    method: "list_invoices",
    name: "List Invoices",
    description: listInvoicesPrompt(context),
    parameters: listInvoicesParameters(context),
    actions: {
      invoices: {
        read: true
      }
    }
  },
  {
    method: "create_invoice_item",
    name: "Create Invoice Item",
    description: createInvoiceItemPrompt(context),
    parameters: createInvoiceItemParameters(context),
    actions: {
      invoiceItems: {
        create: true
      }
    }
  },
  {
    method: "finalize_invoice",
    name: "Finalize Invoice",
    description: finalizeInvoicePrompt(context),
    parameters: finalizeInvoiceParameters(context),
    actions: {
      invoices: {
        update: true
      }
    }
  },
  {
    method: "retrieve_balance",
    name: "Retrieve Balance",
    description: retrieveBalancePrompt(context),
    parameters: retrieveBalanceParameters(context),
    actions: {
      balance: {
        read: true
      }
    }
  },
  {
    method: "create_refund",
    name: "Create Refund",
    description: createRefundPrompt(context),
    parameters: createRefundParameters(context),
    actions: {
      refunds: {
        create: true
      }
    }
  },
  {
    method: "list_payment_intents",
    name: "List Payment Intents",
    description: listPaymentIntentsPrompt(context),
    parameters: listPaymentIntentsParameters(context),
    actions: {
      paymentIntents: {
        read: true
      }
    }
  },
  {
    method: "list_subscriptions",
    name: "List Subscriptions",
    description: listSubscriptionsPrompt(context),
    parameters: listSubscriptionsParameters(context),
    actions: {
      subscriptions: {
        read: true
      }
    }
  },
  {
    method: "search_documentation",
    name: "Search Documentation",
    description: searchDocumentationPrompt(context),
    parameters: searchDocumentationParameters(context),
    actions: {
      documentation: {
        read: true
      }
    }
  }
];
var tools_default = tools;

// src/modelcontextprotocol/toolkit.ts
var StripeAgentToolkit = class extends McpServer {
  _stripe;
  constructor({
    secretKey,
    configuration
  }) {
    super({
      name: "Stripe",
      version: "0.4.0",
      configuration: {
        ...configuration,
        context: {
          ...configuration.context,
          mode: "modelcontextprotocol"
        }
      }
    });
    this._stripe = new api_default(secretKey, configuration.context);
    const context = configuration.context || {};
    const filteredTools = tools_default(context).filter(
      (tool) => isToolAllowed(tool, configuration)
    );
    filteredTools.forEach((tool) => {
      this.tool(
        tool.method,
        tool.description,
        tool.parameters.shape,
        async (arg, _extra) => {
          const result = await this._stripe.run(tool.method, arg);
          return {
            content: [
              {
                type: "text",
                text: String(result)
              }
            ]
          };
        }
      );
    });
  }
};
var toolkit_default = StripeAgentToolkit;
export {
  toolkit_default as StripeAgentToolkit
};
//# sourceMappingURL=index.mjs.map