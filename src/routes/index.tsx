import { component$, useTask$ } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import type { DocumentHead } from "@builder.io/qwik-city";
import PlaygroundPage from "~/integrations/shadcn/playground/playground";
import { token } from "~/api/TikToken/token-counter";
import { PlaygroundToolbar } from "~/integrations/shadcn/playground/playground-toolbar";

const QPlaygroundPage = qwikify$(PlaygroundPage, { eagerness: "load" });
const QPlaygroundToolbar = qwikify$(PlaygroundToolbar, { eagerness: "hover" });

export default component$(() => {
  useTask$(() => {
    console.log(token);
  });

  return (
    <>
      <div class="hidden h-full flex-col md:flex">
        <QPlaygroundToolbar />
        <QPlaygroundPage />
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
