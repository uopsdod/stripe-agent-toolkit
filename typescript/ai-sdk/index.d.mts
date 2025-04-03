import { CoreTool, Experimental_LanguageModelV1Middleware } from 'ai';

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

type StripeMiddlewareConfig = {
    billing?: {
        type?: 'token';
        customer: string;
        meters: {
            input?: string;
            output?: string;
        };
    };
};
declare class StripeAgentToolkit {
    private _stripe;
    tools: {
        [key: string]: CoreTool;
    };
    constructor({ secretKey, configuration, }: {
        secretKey: string;
        configuration: Configuration;
    });
    middleware(config: StripeMiddlewareConfig): Experimental_LanguageModelV1Middleware;
    getTools(): {
        [key: string]: CoreTool;
    };
}

export { StripeAgentToolkit };
