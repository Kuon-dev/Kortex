import { component$, $, useSignal, noSerialize } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, server$ } from "@builder.io/qwik-city";

import { PlaygroundPage } from "~/integrations/shadcn/playground/playground";
import { PlaygroundToolbar } from "~/integrations/shadcn/playground/playground-toolbar";
import { PlaygroundSidebar } from "~/integrations/shadcn/playground/playground-sidebar";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const QPlaygroundPage = qwikify$(PlaygroundPage, { eagerness: "hover" });
const QPlaygroundToolbar = qwikify$(PlaygroundToolbar, { eagerness: "hover" });
const QPlaygroundSidebar = qwikify$(PlaygroundSidebar, { eagerness: "idle" });

const streamChat = server$(async function* () {
  let resolveToken: (value: string) => void;

  const chat = new ChatOpenAI({
    openAIApiKey: (import.meta as any).env.VITE_OPENAI_API_KEY ?? "",
    maxTokens: 25,
    streaming: true,
  });

  // Function to handle token and resolve promise
  const handleLLMNewToken = (token: string) => {
    console.log({ token });
    if (resolveToken) {
      resolveToken(token);
    }
  };

  // Make the chat call
  chat.call([new HumanMessage("Tell me a joke.")], {
    callbacks: [
      {
        handleLLMNewToken,
      },
    ],
  });

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
  const handleSubmit = $(async (e: any) => {
    const response = await streamChat();
    for await (const i of response) {
      console.log(i);
      message.value += ` ${i}`;
    }
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
                  <QPlaygroundPage onDataEmit$={async (e) => handleSubmit(e)} />
                  {message}
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
