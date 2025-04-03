import { ChatCompletionTool, ChatCompletionMessageToolCall, ChatCompletionToolMessageParam } from 'openai/resources';

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

declare class StripeAgentToolkit {
    private _stripe;
    tools: ChatCompletionTool[];
    constructor({ secretKey, configuration, }: {
        secretKey: string;
        configuration: Configuration;
    });
    getTools(): ChatCompletionTool[];
    /**
     * Processes a single OpenAI tool call by executing the requested function.
     *
     * @param {ChatCompletionMessageToolCall} toolCall - The tool call object from OpenAI containing
     *   function name, arguments, and ID.
     * @returns {Promise<ChatCompletionToolMessageParam>} A promise that resolves to a tool message
     *   object containing the result of the tool execution with the proper format for the OpenAI API.
     */
    handleToolCall(toolCall: ChatCompletionMessageToolCall): Promise<ChatCompletionToolMessageParam>;
}

export { StripeAgentToolkit };
