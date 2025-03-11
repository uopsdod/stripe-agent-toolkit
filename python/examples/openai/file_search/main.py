import asyncio
import os
from pydantic import BaseModel, Field

from dotenv import load_dotenv
load_dotenv()

from agents import Agent, Runner
from agents.tool import FileSearchTool

from stripe_agent_toolkit.openai.toolkit import StripeAgentToolkit

stripe_agent_toolkit = StripeAgentToolkit(
    secret_key=os.getenv("STRIPE_SECRET_KEY"),
    configuration={
        "actions": {
            "customers": {
                "create": True,
            },
            "products": {
                "create": True,
            },
            "prices": {
                "create": True,
            },
            "invoice_items": {
                "create": True,
            },
            "invoices": {
                "create": True,
                "update": True,
            },
        }
    },
)

class InvoiceOutput(BaseModel):
    name: str = Field(description="The name of the customer")
    email: str = Field(description="The email of the customer")
    service: str = Field(description="The service that the customer is invoiced for")
    amount_due: int = Field(description="The dollar amount due for the invoice. Convert text to dollar amounts if needed.")

class InvoiceListOutput(BaseModel):
    invoices: list[InvoiceOutput]

file_search_agent = Agent(
    name="File Search Agent",
    instructions="You are an expert at searching for financial documents.",
    tools=[
        FileSearchTool(
            max_num_results=50,
            vector_store_ids=[os.getenv("OPENAI_VECTOR_STORE_ID")],
        )
    ],
    output_type=InvoiceListOutput,
)

invoice_agent = Agent(
    name="Invoice Agent",
    instructions="You are an expert at using the Stripe API to create, finalize, and send invoices to customers.",
    tools=stripe_agent_toolkit.get_tools(),
)

async def main():
    assignment = "Search for all customers that haven't paid across all of my documents. For each, create, finalize, and send an invoice."

    outstanding_invoices = await Runner.run(
        file_search_agent,
        assignment,
    )

    invoices_to_send = outstanding_invoices.final_output.invoices

    for invoice in invoices_to_send:
        print(invoice.name, invoice.email, invoice.service, invoice.amount_due)

    # Iterate through each invoice and create a task
    for invoice in invoices_to_send:
        print(f"Initiating invoice generation for {invoice.name} ({invoice.email}) for {invoice.service} for ${invoice.amount_due}.")

        invoice_task = await Runner.run(
            invoice_agent,
            f"Create, finalize, and send an invoice to {invoice.name} ({invoice.email}) for {invoice.service} for ${invoice.amount_due}."
        )
        print(invoice_task.final_output)


if __name__ == "__main__":
    asyncio.run(main())
