import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

type Object$1 = 'customers' | 'invoices' | 'invoiceItems' | 'paymentLinks' | 'products' | 'prices' | 'balance' | 'refunds' | 'paymentIntents' | 'subscriptions' | 'documentation';
type Permission = 'create' | 'update' | 'read';
type Actions = {
    [K in Object$1]?: {
        [K in Permission]?: boolean;
    };
} & {
    balance?: {
        read?: boolean;
    };
};
type Context = {
    account?: string;
    customer?: string;
    mode?: 'modelcontextprotocol' | 'toolkit';
};
type Configuration = {
    actions?: Actions;
    context?: Context;
};

declare class StripeAgentToolkit extends McpServer {
    private _stripe;
    constructor({ secretKey, configuration, }: {
        secretKey: string;
        configuration: Configuration;
    });
}

export { StripeAgentToolkit };
