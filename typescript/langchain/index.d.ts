import { StructuredTool, BaseToolkit } from '@langchain/core/tools';
import { z } from 'zod';
import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { RunnableConfig } from '@langchain/core/runnables';
import Stripe from 'stripe';

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

declare class StripeAPI {
    stripe: Stripe;
    context: Context;
    constructor(secretKey: string, context?: Context);
    createMeterEvent({ event, customer, value, }: {
        event: string;
        customer: string;
        value: string;
    }): Promise<void>;
    run(method: string, arg: any): Promise<string>;
}

declare class StripeTool extends StructuredTool {
    stripeAPI: StripeAPI;
    method: string;
    name: string;
    description: string;
    schema: z.ZodObject<any, any, any, any>;
    constructor(StripeAPI: StripeAPI, method: string, description: string, schema: z.ZodObject<any, any, any, any, {
        [x: string]: any;
    }>);
    _call(arg: z.output<typeof this.schema>, _runManager?: CallbackManagerForToolRun, _parentConfig?: RunnableConfig): Promise<any>;
}

declare class StripeAgentToolkit implements BaseToolkit {
    private _stripe;
    tools: StripeTool[];
    constructor({ secretKey, configuration, }: {
        secretKey: string;
        configuration: Configuration;
    });
    getTools(): StripeTool[];
}

export { StripeAgentToolkit };
