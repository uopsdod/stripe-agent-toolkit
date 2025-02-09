import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {Configuration, isToolAllowed} from '../shared/configuration';
import StripeAPI from '../shared/api';
import tools from '../shared/tools';

class StripeAgentToolkit extends McpServer {
  private _stripe: StripeAPI;

  constructor({
    secretKey,
    configuration,
  }: {
    secretKey: string;
    configuration: Configuration;
  }) {
    super({
      name: 'Stripe',
      version: '0.2.2',
    });

    this._stripe = new StripeAPI(
      secretKey,
      configuration.context,
      'stripe-agent-toolkit-typescript-mcp'
    );

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      this.tool(
        tool.method,
        tool.description,
        tool.parameters.shape,
        // @ts-expect-error
        async (arg: any) => {
          const result = await this._stripe.run(tool.method, arg);
          return {
            content: [
              {
                type: 'text',
                text: result,
              },
            ],
          };
        }
      );
    });
  }
}

export default StripeAgentToolkit;
