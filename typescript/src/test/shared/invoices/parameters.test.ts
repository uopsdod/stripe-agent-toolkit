import {
  createInvoiceParameters,
  listInvoicesParameters,
  createInvoiceItemParameters,
  finalizeInvoiceParameters,
} from '@/shared/invoices/parameters';

describe('createInvoiceParameters', () => {
  it('should return the correct parameters if no context', () => {
    const parameters = createInvoiceParameters({});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['customer', 'days_until_due']);
    expect(fields.length).toBe(2);
  });

  it('should return the correct parameters if customer is specified', () => {
    const parameters = createInvoiceParameters({customer: 'cus_123'});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['days_until_due']);
    expect(fields.length).toBe(1);
  });
});

describe('listInvoicesParameters', () => {
  it('should return the correct parameters if no context', () => {
    const parameters = listInvoicesParameters({});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['customer', 'limit']);
    expect(fields.length).toBe(2);
  });

  it('should return the correct parameters if customer is specified', () => {
    const parameters = listInvoicesParameters({customer: 'cus_123'});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['limit']);
    expect(fields.length).toBe(1);
  });
});

describe('createInvoiceItemParameters', () => {
  it('should return the correct parameters if no context', () => {
    const parameters = createInvoiceItemParameters({});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['customer', 'price', 'invoice']);
    expect(fields.length).toBe(3);
  });

  it('should return the correct parameters if customer is specified', () => {
    const parameters = createInvoiceItemParameters({customer: 'cus_123'});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['price', 'invoice']);
    expect(fields.length).toBe(2);
  });
});

describe('finalizeInvoiceParameters', () => {
  it('should return the correct parameters if no context', () => {
    const parameters = finalizeInvoiceParameters({});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['invoice']);
    expect(fields.length).toBe(1);
  });

  it('should return the correct parameters if customer is specified', () => {
    const parameters = finalizeInvoiceParameters({customer: 'cus_123'});

    const fields = Object.keys(parameters.shape);
    expect(fields).toEqual(['invoice']);
    expect(fields.length).toBe(1);
  });
});
