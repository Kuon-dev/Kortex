import assert from "node:assert";
import { encodingForModel } from "js-tiktoken";

const enc = encodingForModel("gpt-4");

assert(enc.decode(enc.encode("hello world")) === "hello world");
export const token = enc.encode("tiktoken is great!").length;
// export const token = enc.encode("hello world")
