import { type RequestHandler } from "@builder.io/qwik-city";
import { encodingForModel, type TiktokenModel } from "js-tiktoken";

type CounterBody = {
  model: string;
  text: string;
};

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const { model, text } = (await parseBody()) as CounterBody;
  const enc = encodingForModel((model || "gpt-4") as TiktokenModel);
  const tokenCount = enc.encode(text).length;
  json(200, { tokenCount });
};
