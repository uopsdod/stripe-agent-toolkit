import os
from dotenv import load_dotenv

from langchain import hub
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_structured_chat_agent

from stripe_agent_toolkit.langchain.toolkit import StripeAgentToolkit

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o",
)

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

tools = []
tools.extend(stripe_agent_toolkit.get_tools())

prompt = hub.pull("hwchase17/structured-chat-agent")
agent = create_structured_chat_agent(llm, tools, prompt)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

response = agent_executor.invoke(
    {
        "input": """
            Create a payment link for a new product called 'test' with a price
            of $100. Come up with a funny description about buy bots,
            maybe a haiku.
        """,
    }
)

print(response["output"])
