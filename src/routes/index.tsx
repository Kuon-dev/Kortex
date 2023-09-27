import { component$, $, useSignal } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { LLMResult } from "langchain/schema";
import { server$ } from "@builder.io/qwik-city";

import {
  PlaygroundPage,
  type SubmitModelSchemaProps,
} from "~/integrations/shadcn/playground/playground";
import { PlaygroundToolbar } from "~/integrations/shadcn/playground/playground-toolbar";
import { PlaygroundSidebar } from "~/integrations/shadcn/playground/playground-sidebar";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { chatCompletion } from "~/lib/langchain/openai/utils";

const QPlaygroundPage = qwikify$(PlaygroundPage, { eagerness: "hover" });
const QPlaygroundToolbar = qwikify$(PlaygroundToolbar, { eagerness: "hover" });
const QPlaygroundSidebar = qwikify$(PlaygroundSidebar, { eagerness: "idle" });

const streamChat = server$(async function* (e: SubmitModelSchemaProps) {
  console.log("submitted values: ", e);
  const generator = chatCompletion(e);
  for await (const chunk of generator) {
    yield chunk as string;
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
      message.value += `${i}`;
    }
    // stream complete
    streamComplete.value = true;
    console.log(streamComplete.value);
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
