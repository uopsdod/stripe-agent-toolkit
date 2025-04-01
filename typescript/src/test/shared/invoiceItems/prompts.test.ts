import {createInvoiceItemPrompt} from '@/shared/invoiceItems/prompts';

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
