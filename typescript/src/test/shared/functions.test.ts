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
} from '../../shared/functions';

const Stripe = jest.fn().mockImplementation(() => ({
  customers: {
    create: jest.fn(),
    list: jest.fn(),
  },
  products: {
    create: jest.fn(),
    list: jest.fn(),
  },
  prices: {
    create: jest.fn(),
    list: jest.fn(),
  },
  paymentLinks: {
    create: jest.fn(),
  },
  invoices: {
    create: jest.fn(),
    finalizeInvoice: jest.fn(),
    retrieve: jest.fn(),
  },
  invoiceItems: {
    create: jest.fn(),
  },
  balance: {
    retrieve: jest.fn(),
  },
}));

let stripe: ReturnType<typeof Stripe>;

beforeEach(() => {
  stripe = new Stripe('fake-api-key');
});

describe('createCustomer', () => {
  it('should create a customer and return the id', async () => {
    const params = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const mockCustomer = {id: 'cus_123456', email: 'test@example.com'};
    stripe.customers.create.mockResolvedValue(mockCustomer);

    const result = await createCustomer(stripe, params);

    expect(stripe.customers.create).toHaveBeenCalledWith(params);
    expect(result).toEqual({id: mockCustomer.id});
  });
});

describe('listCustomers', () => {
  it('should list customers and return their ids', async () => {
    const mockCustomers = [
      {id: 'cus_123456', email: 'test1@example.com'},
      {id: 'cus_789012', email: 'test2@example.com'},
    ];

    stripe.customers.list.mockResolvedValue({data: mockCustomers});
    const result = await listCustomers(stripe, {});

    expect(stripe.customers.list).toHaveBeenCalledWith({});
    expect(result).toEqual(mockCustomers.map(({id}) => ({id})));
  });
});

describe('createProduct', () => {
  it('should create a product and return it', async () => {
    const params = {
      name: 'Test Product',
    };

    const mockProduct = {id: 'prod_123456', name: 'Test Product'};
    stripe.products.create.mockResolvedValue(mockProduct);

    const result = await createProduct(stripe, params);

    expect(stripe.products.create).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockProduct);
  });
});

describe('listProducts', () => {
  it('should list products and return them', async () => {
    const mockProducts = [
      {id: 'prod_123456', name: 'Test Product 1'},
      {id: 'prod_789012', name: 'Test Product 2'},
    ];

    stripe.products.list.mockResolvedValue({data: mockProducts});
    const result = await listProducts(stripe, {});

    expect(stripe.products.list).toHaveBeenCalledWith({});
    expect(result).toEqual(mockProducts);
  });
});

describe('createPrice', () => {
  it('should create a price and return it', async () => {
    const params = {
      unit_amount: 1000,
      currency: 'usd',
      product: 'prod_123456',
    };

    const mockPrice = {id: 'price_123456', unit_amount: 1000, currency: 'usd'};
    stripe.prices.create.mockResolvedValue(mockPrice);

    const result = await createPrice(stripe, params);

    expect(stripe.prices.create).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockPrice);
  });
});

describe('listPrices', () => {
  it('should list prices and return them', async () => {
    const mockPrices = [
      {id: 'price_123456', unit_amount: 1000, currency: 'usd'},
      {id: 'price_789012', unit_amount: 2000, currency: 'usd'},
    ];

    stripe.prices.list.mockResolvedValue({data: mockPrices});
    const result = await listPrices(stripe, {});

    expect(stripe.prices.list).toHaveBeenCalledWith({});
    expect(result).toEqual(mockPrices);
  });
});

describe('createPaymentLink', () => {
  it('should create a payment link and return it', async () => {
    const params = {
      line_items: [
        {
          price: 'price_123456',
          quantity: 1,
        },
      ],
    };

    const mockPaymentLink = {
      id: 'pl_123456',
      url: 'https://example.com',
    };

    stripe.paymentLinks.create.mockResolvedValue(mockPaymentLink);

    const result = await createPaymentLink(stripe, {
      price: 'price_123456',
      quantity: 1,
    });

    expect(stripe.paymentLinks.create).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockPaymentLink);
  });
});

describe('createInvoice', () => {
  it('should create an invoice and return it', async () => {
    const params = {
      customer: 'cus_123456',
      items: [{price: 'price_123456', quantity: 1}],
    };

    const mockInvoice = {id: 'in_123456', customer: 'cus_123456'};
    stripe.invoices.create.mockResolvedValue(mockInvoice);
    const result = await createInvoice(stripe, params);
    expect(stripe.invoices.create).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockInvoice);
  });
});

describe('finalizeInvoice', () => {
  it('should finalize an invoice and return it', async () => {
    const invoiceId = 'in_123456';
    const mockInvoice = {id: invoiceId, customer: 'cus_123456'};
    stripe.invoices.finalizeInvoice.mockResolvedValue(mockInvoice);
    const result = await finalizeInvoice(stripe, {invoice: invoiceId});
    expect(stripe.invoices.finalizeInvoice).toHaveBeenCalledWith(invoiceId);
    expect(result).toEqual(mockInvoice);
  });
});

describe('createInvoiceItem', () => {
  it('should create an invoice item and return it', async () => {
    const params = {
      customer: 'cus_123456',
      price: 'price_123456',
      invoice: 'in_123456',
    };

    const mockInvoiceItem = {id: 'ii_123456', invoice: 'in_123456'};
    stripe.invoiceItems.create.mockResolvedValue(mockInvoiceItem);
    const result = await createInvoiceItem(stripe, params);
    expect(stripe.invoiceItems.create).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockInvoiceItem);
  });
});

describe('retrieveBalance', () => {
  it('should retrieve the balance and return it', async () => {
    const mockBalance = {available: [{amount: 1000, currency: 'usd'}]};
    stripe.balance.retrieve.mockResolvedValue(mockBalance);
    const result = await retrieveBalance(stripe, {});
    expect(stripe.balance.retrieve).toHaveBeenCalled();
    expect(result).toEqual(mockBalance);
  });
});
