import StripeAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';
import {zodToJsonSchema} from 'zod-to-json-schema';
import type {
  ChatCompletion,
  ChatCompletionTool,
  ChatCompletionToolMessageParam,
} from 'openai/resources';

class StripeAgentToolkit {
  private _stripe: StripeAPI;

  tools: ChatCompletionTool[];

  constructor({
    secretKey,
    configuration,
  }: {
    secretKey: string;
    configuration: Configuration;
  }) {
    this._stripe = new StripeAPI(secretKey, configuration.context);

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    this.tools = filteredTools.map((tool) => ({
      type: 'function',
      function: {
        name: tool.method,
        description: tool.description,
        parameters: zodToJsonSchema(tool.parameters),
      },
    }));
  }

  getTools(): ChatCompletionTool[] {
    return this.tools;
  }

  async executeTools(completion: ChatCompletion) {
    const toolCalls = completion.choices[0].message.tool_calls;

    if (!toolCalls?.length) {
      return {toolMessages: null, remainingToolCalls: null};
    }

    const availableTools = this.tools;

    const executableToolCalls = toolCalls.filter((tc) =>
      availableTools.find((at) => at.function.name === tc.function.name)
    );
    const nonExecutableToolCalls = toolCalls.filter(
      (tc) =>
        !availableTools.find((at) => at.function.name === tc.function.name)
    );

    const toolCallPromises = executableToolCalls.map(async (tc) => {
      const args = JSON.parse(tc.function.arguments);
      const response = await this._stripe.run(tc.function.name, args);
      return {
        role: 'tool',
        tool_call_id: tc.id,
        content: response,
      } as ChatCompletionToolMessageParam;
    });

    return {
      toolMessages: await Promise.all(toolCallPromises),
      remainingToolCalls: nonExecutableToolCalls,
    };
  }
}

export default StripeAgentToolkit;
