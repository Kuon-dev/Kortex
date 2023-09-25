import { component$, $, useSignal } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import type { DocumentHead } from "@builder.io/qwik-city";
import { server$ } from "@builder.io/qwik-city";

import {
  PlaygroundPage,
  type SubmitModelSchemaProps,
} from "~/integrations/shadcn/playground/playground";
import { PlaygroundToolbar } from "~/integrations/shadcn/playground/playground-toolbar";
import { PlaygroundSidebar } from "~/integrations/shadcn/playground/playground-sidebar";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

const QPlaygroundPage = qwikify$(PlaygroundPage, { eagerness: "hover" });
const QPlaygroundToolbar = qwikify$(PlaygroundToolbar, { eagerness: "hover" });
const QPlaygroundSidebar = qwikify$(PlaygroundSidebar, { eagerness: "idle" });

const streamChat = server$(async function* (e: SubmitModelSchemaProps) {
  console.log("submitted values: ", e);
  let resolveToken: (value: string) => void;
  //
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
  //
  // Function to handle token and resolve promise
  const handleLLMNewToken = (token: string) => {
    if (resolveToken) {
      resolveToken(token);
    }
  };

  // Make the chat call
  const res = chat.call(
    [new SystemMessage(e.systemPrompt), new HumanMessage(e.newUserPrompt)],
    {
      callbacks: [
        {
          handleLLMNewToken,
        },
      ],
    },
  );

  console.log(res);

  // Infinite loop to yield tokens as they come in
  // This loop will keep running as long as the chat stream is open
  for (;;) {
    const tokenPromise = new Promise<string>((resolve) => {
      resolveToken = resolve;
    });
    const token = await tokenPromise;
    yield token;
  }
});

export default component$(() => {
  const message = useSignal("");
  const streamComplete = useSignal(true);

  const handleSubmit = $(async (e: any) => {
    //reset
    message.value = "";
    streamComplete.value = false;
    // start stream
    const response = await streamChat(e);
    for await (const i of response) {
      message.value += ` ${i}`;
    }
    // stream complete
    streamComplete.value = true;
  });

  return (
    <>
      <div class="min-h-screen flex-col flex dark:bg-primary-foreground dark:text-white">
        <QPlaygroundToolbar />
        <div class="flex-1">
          <div class="container h-full py-6">
            <div class="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div class="hidden flex-col space-y-4 sm:flex md:order-2">
                <QPlaygroundSidebar />
              </div>
              <div class="md:order-1">
                <div class="mt-0 border-0 p-0">
                  <QPlaygroundPage
                    onDataEmit$={async (e) => handleSubmit(e)}
                    streamedMessage={message.value}
                    isStreamingComplete={streamComplete.value}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
