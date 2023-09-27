import { ChatOpenAI } from "langchain/chat_models/openai";
import { IterableReadableStream } from "langchain/dist/util/stream";
import { SystemMessage, HumanMessage, BaseMessageChunk } from "langchain/schema";
import { SubmitModelSchemaProps } from "~/integrations/shadcn/playground/playground";

export async function* chatCompletion(e: SubmitModelSchemaProps) {
  const chat = new ChatOpenAI({
    openAIApiKey: (import.meta as any).env.VITE_OPENAI_API_KEY ?? "",
    modelName: e.model,
    temperature: e.temperature,
    maxTokens: e.maxLength,
    topP: e.topP,
    frequencyPenalty: e.frequencyPenalty,
    presencePenalty: e.presencePenalty,
    stop: e.stop ?? [],

    // non configurable options
    streaming: true,
  });

  const res = await chat.stream(
    [new SystemMessage(e.systemPrompt), new HumanMessage(e.newUserPrompt)],
  );

  for await (const chunk of toIterable(res)) {
    yield chunk as string;
  }
}

async function* toIterable(data: IterableReadableStream<BaseMessageChunk>) {
  const reader = data.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return;
    }
    yield value.content;
  }
}
