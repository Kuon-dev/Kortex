import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const stream = server$(async function* () {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
});

export default component$(() => {
  const message = useSignal("");
  const isStreaming = useSignal(false); // New signal to manage streaming state

  return (
    <div>
      {/* Existing Button */}
      <button
        onClick$={async () => {
          isStreaming.value = true; // Set streaming state to true
          const response = await stream();
          for await (const i of response) {
            message.value += ` ${i}`;
          }
          isStreaming.value = false; // Set streaming state to false
          console.log(isStreaming.value);
        }}
        disabled={isStreaming.value}
      >
        start
      </button>

      {/* New Button */}
      <div>{isStreaming.value}</div>
      <div>
        {message.value}
        {isStreaming.value}
      </div>
    </div>
  );
});
