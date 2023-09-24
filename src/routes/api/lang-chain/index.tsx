import { ChatOpenAI } from "langchain/chat_models/openai";
import { type RequestHandler } from "@builder.io/qwik-city";
import { HumanMessage } from "langchain/schema";

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.9,
    maxTokens: 256,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stop: [],

    // non configurable options
    streaming: true,
  });

  const response = await model.call([new HumanMessage("Tell me a joke.")], {
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          console.log({ token });
        },
      },
    ],
  });
  json(200, {});
};
