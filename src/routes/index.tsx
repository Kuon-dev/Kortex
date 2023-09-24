import { component$ } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$ } from "@builder.io/qwik-city";
import { token } from "~/api/TikToken/token-counter";

import { PlaygroundPage } from "~/integrations/shadcn/playground/playground";
import { PlaygroundToolbar } from "~/integrations/shadcn/playground/playground-toolbar";
import { PlaygroundSidebar } from "~/integrations/shadcn/playground/playground-sidebar";

const QPlaygroundPage = qwikify$(PlaygroundPage, { eagerness: "hover" });
const QPlaygroundToolbar = qwikify$(PlaygroundToolbar, { eagerness: "hover" });
const QPlaygroundSidebar = qwikify$(PlaygroundSidebar, { eagerness: "idle" });

export const useChatLLM = routeAction$(async (chatConfig) => {
  console.log(chatConfig);
});

export default component$(() => {
  const chat = useChatLLM();
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
                    onDataEmit$={async (e) => {
                      await chat.submit(e);
                    }}
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
