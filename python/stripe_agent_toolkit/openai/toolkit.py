"""Stripe Agent Toolkit."""

from typing import List, Optional
from pydantic import PrivateAttr
import json
from openai.types.chat import ChatCompletion, ChatCompletionToolParam, ChatCompletionToolMessageParam, ChatCompletionMessageToolCall


from ..api import StripeAPI
from ..tools import tools
from ..configuration import Configuration, is_tool_allowed


class StripeAgentToolkit:
    _tools: List[ChatCompletionToolParam] = PrivateAttr(default=[])
    _stripe_api: StripeAPI

    def __init__(
        self, secret_key: str, configuration: Optional[Configuration] = None
    ):
        super().__init__()

        context = configuration.get("context") if configuration else None

        self._stripe_api = StripeAPI(secret_key=secret_key, context=context)
        
        filtered_tools = [
            tool for tool in tools if is_tool_allowed(tool, configuration)
        ]

        self._tools = [
            {"type": "function",
             "function": {
                 "name": tool["method"],
                 "description": tool["description"],
                 "parameters": tool["args_schema"].model_json_schema()
             }}
            for tool in filtered_tools
        ]

    def get_tools(self) -> List[ChatCompletionToolParam]:
        """Get the tools in the toolkit."""
        return self._tools

    def execute_tools(self, completion: ChatCompletion):
        tool_calls = completion.choices[0].message.tool_calls
        
        if not tool_calls:
            return None, None
        
        available_tools = self.get_tools()
        
        executable_tool_calls = [
            tc for tc in tool_calls 
            if any(at["function"]["name"] == tc.function.name for at in available_tools)
        ]
        
        non_executable_tool_calls = [
            tc for tc in tool_calls 
            if not any(at["function"]["name"] == tc.function.name for at in available_tools)
        ]
        
        def process_tool_call(tc: ChatCompletionMessageToolCall) -> ChatCompletionToolMessageParam:
            args = json.loads(tc.function.arguments)
            response = self._stripe_api.run(tc.function.name, **args)
            return {
                "role": "tool",
                "tool_call_id": tc.id,
                "content": response
            }
        
        tool_messages = [process_tool_call(tc) for tc in executable_tool_calls]
        
        return tool_messages, non_executable_tool_calls