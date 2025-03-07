# pyright: strict

import asyncio

from agents import (
    Helpers,
    TInputItem,
)

import support_agent


async def main():
    """Simple REPL for testing your support agent"""
    input_items: list[TInputItem] = []
    while True:
        user_input = input("Enter your message: ")
        input_items.append({"content": user_input, "role": "user"})
        output = await support_agent.run(input_items)
        print(f"Assistant: {Helpers.text_output(output.all_outputs)}")
        input_items = output.next_turn_inputs


if __name__ == "__main__":
    asyncio.run(main())
