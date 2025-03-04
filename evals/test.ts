import { StripeAgentToolkit } from "../typescript/src/openai";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";
import { wrapOpenAI } from "braintrust";

require("dotenv").config();

// This wrap function adds useful tracing in Braintrust
const openai = wrapOpenAI(
  new OpenAI({
    baseURL: process.env.OPEN_AI_BASE_URL,
    apiKey: "EMPTY",
  })
);

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

// This is the core "workhorse" function that accepts an input and returns a response
// which calls stripe agent tookit
async function task(input: string) {
  let messages: ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: input,
    },
  ];

  let completion: ChatCompletion;

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: stripeAgentToolkit.getTools(),
    });

    const message = completion.choices[0].message;

    console.log(message);

    messages.push(message);

    if (message.tool_calls?.length > 0) {
      // eslint-disable-next-line no-await-in-loop
      const toolMessages = await Promise.all(
        message.tool_calls.map((tc) => stripeAgentToolkit.handleToolCall(tc))
      );
      messages = [...messages, ...toolMessages];
    } else {
      console.log(completion.choices[0].message);
      break;
    }
  }

  return {
    responseChatCompletions: [completion.choices[0].message],
  };
}

async function main() {
  const s = await task(
    "Create a payment link for a new product called 'test' with a price of $100. Come up with a funny description about buy bots, maybe a haiku."
  );
  console.log(JSON.stringify(s, null, 2));
}

main();
