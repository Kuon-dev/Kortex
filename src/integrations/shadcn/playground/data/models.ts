export const types = ["GPT-3.5", "GPT-4"] as const;

export type ModelType = (typeof types)[number];

// Define the Model interface
export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
  maxTokens: number;
  trainingData: string;
}

// Define the models array
export const models: Model<string>[] = [
  // Existing GPT-3 models
  // {
  //   id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
  //   name: "text-davinci-003",
  //   description: "Most capable GPT-3 model.",
  //   type: "GPT-3",
  //   strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
  //   maxTokens: 4096,
  //   trainingData: "Up to 2020",
  // },
  // {
  //   id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
  //   name: "text-curie-001",
  //   description: "Very capable, but faster and lower cost than Davinci.",
  //   type: "GPT-3",
  //   strengths: "Language translation, complex classification, sentiment, summarization",
  //   maxTokens: 2048,
  //   trainingData: "Up to 2020",
  // },
  // {
  //   id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
  //   name: "text-babbage-001",
  //   description: "Capable of straightforward tasks, very fast, and lower cost.",
  //   type: "GPT-3",
  //   strengths: "Moderate classification, semantic search",
  //   maxTokens: 1024,
  //   trainingData: "Up to 2020",
  // },
  // {
  //   id: "be638fb1-973b-4471-a49c-290325085802",
  //   name: "text-ada-001",
  //   description: "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
  //   type: "GPT-3",
  //   strengths: "Parsing text, simple classification, address correction, keywords",
  //   maxTokens: 512,
  //   trainingData: "Up to 2020",
  // },
  // // New GPT-4 models
  {
    id: "gpt-4",
    name: "gpt-4",
    description: "More capable than any GPT-3.5 model, optimized for chat.",
    type: "GPT-4",
    strengths: "Complex tasks, chat optimization",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-4-0613",
    name: "gpt-4-0613",
    description:
      "Snapshot of gpt-4 from June 13th 2023 with function calling data.",
    type: "GPT-4",
    strengths: "Function calling, snapshot version",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-4-32k",
    name: "gpt-4-32k",
    description:
      "Same capabilities as the standard gpt-4 mode but with 4x the context length.",
    type: "GPT-4",
    strengths: "Extended context",
    maxTokens: 32768,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-4-32k-0613",
    name: "gpt-4-32k-0613",
    description: "Snapshot of gpt-4-32 from June 13th 2023.",
    type: "GPT-4",
    strengths: "Extended context, snapshot version",
    maxTokens: 32768,
    trainingData: "Up to Sep 2021",
  },
  // New GPT-3.5 models
  {
    id: "gpt-3.5-turbo",
    name: "gpt-3.5-turbo",
    description:
      "Most capable GPT-3.5 model, optimized for chat at 1/10th the cost.",
    type: "GPT-3.5",
    strengths: "Chat optimization, cost-effective",
    maxTokens: 4097,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-3.5-turbo-16k",
    name: "gpt-3.5-turbo-16k",
    description:
      "Same capabilities as standard gpt-3.5-turbo but with 4x the context.",
    type: "GPT-3.5",
    strengths: "Extended context",
    maxTokens: 16385,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-3.5-turbo-0613",
    name: "gpt-3.5-turbo-0613",
    description:
      "Snapshot of gpt-3.5-turbo from June 13th 2023 with function calling data.",
    type: "GPT-3.5",
    strengths: "Function calling, snapshot version",
    maxTokens: 4097,
    trainingData: "Up to Sep 2021",
  },
  {
    id: "gpt-3.5-turbo-16k-0613",
    name: "gpt-3.5-turbo-16k-0613",
    description: "Snapshot of gpt-3.5-turbo-16k from June 13th 2023.",
    type: "GPT-3.5",
    strengths: "Extended context, snapshot version",
    maxTokens: 16385,
    trainingData: "Up to Sep 2021",
  },
];
