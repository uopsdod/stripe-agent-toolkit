import {
  createInvoiceItemPrompt,
  createInvoicePrompt,
  listInvoicesPrompt,
} from '../../shared/invoices/prompts';
import {listPaymentIntentsPrompt} from '../../shared/paymentIntents/prompts';

describe('createInvoicePrompt', () => {
  it('should return the correct prompt', () => {
    const prompt = createInvoicePrompt();
    expect(prompt).toContain('customer');
  });

  it('should return the correct prompt when a customer is specified', () => {
    const prompt = createInvoicePrompt({customer: 'cus_123'});
    expect(prompt).not.toContain('customer');
  });
});

describe('listInvoicesPrompt', () => {
  it('should return the correct prompt', () => {
    const prompt = listInvoicesPrompt();
    expect(prompt).toContain('customer');
  });

  it('should return the correct prompt when a customer is specified', () => {
    const prompt = listInvoicesPrompt({customer: 'cus_123'});
    expect(prompt).not.toContain('customer');
  });
});

describe('createInvoiceItemPrompt', () => {
  it('should return the correct prompt', () => {
    const prompt = createInvoiceItemPrompt();
    expect(prompt).toContain('customer');
  });

  it('should return the correct prompt when a customer is specified', () => {
    const prompt = createInvoiceItemPrompt({customer: 'cus_123'});
    expect(prompt).not.toContain('customer');
  });
});

describe('listPaymentIntentsPrompt', () => {
  it('should return the correct prompt', () => {
    const prompt = listPaymentIntentsPrompt();
    expect(prompt).toContain('customer');
  });

  it('should return the correct prompt when a customer is specified', () => {
    const prompt = listPaymentIntentsPrompt({customer: 'cus_123'});
    expect(prompt).not.toContain('customer');
  });
});
