require("dotenv").config();

import { StripeAgentToolkit } from "../typescript/src/openai";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";
import { Eval, wrapOpenAI } from "braintrust";
import { Assertion, AssertionScorer } from "./scorer";

// This wrap function adds useful tracing in Braintrust
export const openai = wrapOpenAI(
  new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
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

  let completion: OpenAI.Chat.Completions.ChatCompletion;

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: stripeAgentToolkit.getTools(),
    });

    const message = completion.choices[0].message;

    messages.push(message);

    if (message.tool_calls?.length! > 0) {
      // eslint-disable-next-line no-await-in-loop
      const toolMessages = await Promise.all(
        message.tool_calls!.map((tc) => stripeAgentToolkit.handleToolCall(tc))
      );

      messages = [...messages, ...toolMessages];
    } else {
      console.log(completion.choices[0].message);
      break;
    }
  }

  return {
    responseChatCompletions: [completion.choices[0].message],
    messages,
  };
}

// Define test cases
const testCases: {
  input: string;
  expected: Assertion[];
}[] = [
  {
    input:
      "Create a product called 'Test Product' with a description 'A test product for evaluation'",
    expected: [
      {
        path: "messages[1].tool_calls[0].function.name",
        assertion_type: "equals",
        value: "create_product",
      },
      {
        path: "responseChatCompletions[0].content",
        assertion_type: "llm_criteria_met",
        value:
          "The message should include a successful product creation response",
      },
    ],
  },
  {
    input: "Create a price of $100 USD for a product you just created",
    expected: [
      {
        path: "messages[3].tool_calls[0].function.name",
        assertion_type: "equals",
        value: "create_price",
      },
      {
        path: "messages",
        assertion_type: "llm_criteria_met",
        value:
          "The messages should include a successful price creation response",
      },
    ],
  },
  {
    input: "Create a payment link",
    expected: [
      {
        path: "messages[1].tool_calls[5].function.name",
        assertion_type: "equals",
        value: "create_payment_link",
      },
      {
        path: "responseChatCompletions[0].content",
        assertion_type: "semantic_contains",
        value: "payment link",
      },
    ],
  },
  {
    input: "List all available products",
    expected: [
      {
        path: "messages[1].tool_calls[0].function.name",
        assertion_type: "equals",
        value: "list_products",
      },
      {
        path: "messages",
        assertion_type: "llm_criteria_met",
        value:
          "The messages should include a list of products returned from the Stripe API",
      },
    ],
  },
  {
    input:
      "Create a customer named 'Test Customer' with email 'test@example.com'",
    expected: [
      {
        path: "messages[1].tool_calls[0].function.name",
        assertion_type: "equals",
        value: "create_customer",
      },
      {
        path: "messages",
        assertion_type: "llm_criteria_met",
        value:
          "The messages should include a successful customer creation response",
      },
    ],
  },
  {
    input:
      "Create a payment link for a new product called 'test' with a price of $100. Come up with a funny description about buy bots, maybe a haiku.",
    expected: [
      {
        path: "messages",
        assertion_type: "llm_criteria_met",
        value:
          "The messages should include a sequence of: product creation, price creation, and payment link creation",
      },
      {
        path: "responseChatCompletions[0].content",
        assertion_type: "semantic_contains",
        value: "payment link",
      },
      {
        path: "responseChatCompletions[0].content",
        assertion_type: "semantic_contains",
        value: "haiku",
      },
    ],
  },
];

async function runEvaluation() {
  console.log("Starting evaluation...");

  await Eval("agent-toolkit", {
    data: testCases,
    task: async (input) => {
      const result = await task(input);
      return result;
    },
    scores: [AssertionScorer],
  });
}

// Modify the main function to run the eval
async function main() {
  // Uncomment to run a single test
  // const s = await task(
  //   "Create a payment link for a new product called 'test' with a price of $100. Come up with a funny description about buy bots, maybe a haiku."
  // );
  // console.log(JSON.stringify(s, null, 2));

  // Run the evaluation
  await runEvaluation();
}

main();
