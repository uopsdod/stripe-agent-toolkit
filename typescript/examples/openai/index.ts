import {StripeAgentToolkit} from '@stripe/agent-toolkit/openai';
import OpenAI from 'openai';
import type {ChatCompletionMessageParam} from 'openai/resources';

require('dotenv').config();

const openai = new OpenAI();

const stripeAgentToolkit = new StripeAgentToolkit({
  secretKey: process.env.STRIPE_SECRET_KEY!,
  configuration: {
    actions: {
      paymentLinks: {
        create: true,
      },
      products: {
        create: true,
      },
      prices: {
        create: true,
      },
    },
  },
});

(async (): Promise<void> => {
  let messages: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: `Create a payment link for a new product called 'test' with a price
of $100. Come up with a funny description about buy bots,
maybe a haiku.`,
    },
  ];

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools: stripeAgentToolkit.getTools(),
    });

    messages.push(completion.choices[0].message);

    const {toolMessages, remainingToolCalls} =
      // eslint-disable-next-line no-await-in-loop
      await stripeAgentToolkit.executeTools(completion);

    if (toolMessages) {
      messages = [...messages, ...toolMessages];
    } else {
      console.log(completion.choices[0].message);
      break;
    }
  }
})();
