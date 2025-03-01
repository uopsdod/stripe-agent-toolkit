import os
from dotenv import load_dotenv

from openai import OpenAI
from stripe_agent_toolkit.openai.toolkit import StripeAgentToolkit

load_dotenv()

stripe_agent_toolkit = StripeAgentToolkit(
    secret_key=os.getenv("STRIPE_SECRET_KEY"),
    configuration={
        "actions": {
            "payment_links": {
                "create": True,
            },
            "products": {
                "create": True,
            },
            "prices": {
                "create": True,
            },
        }
    },
)

client = OpenAI()

messages = [
    {
        "role": "user",
        "content": """Create a payment link for a new product called 'test' with a price
of $100. Come up with a funny description about buy bots,
maybe a haiku.""",
    },
]

while True:
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=stripe_agent_toolkit.get_tools()
    )

    messages.append(completion.choices[0].message)

    tool_messages, remaining_tool_calls = stripe_agent_toolkit.execute_tools(completion)

    if tool_messages:
        messages.extend(tool_messages)
    else:
        print(completion.choices[0].message)
        break
