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
  pricing: number;
}

// Define the models array
export const models: Model<string>[] = [
  // GPT-4 models
  {
    id: "gpt-4",
    name: "gpt-4",
    description: "More capable than any GPT-3.5 model, optimized for chat.",
    type: "GPT-4",
    strengths: "Complex tasks, chat optimization",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
    pricing: 0.06,
  },
  {
    id: "gpt-4-0613",
    name: "gpt-4-0613",
    description:
      "Snapshot of gpt-4 from June 13th 2023 with function calling data.",
    type: "GPT-4",
    strengths: "Snapshot version",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
    pricing: 0.06,
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
    pricing: 0.12,
  },
  {
    id: "gpt-4-32k-0613",
    name: "gpt-4-32k-0613",
    description: "Snapshot of gpt-4-32 from June 13th 2023.",
    type: "GPT-4",
    strengths: "Extended context, snapshot version",
    maxTokens: 32768,
    trainingData: "Up to Sep 2021",
    pricing: 0.12,
  },
  // GPT-3.5 models
  {
    id: "gpt-3.5-turbo",
    name: "gpt-3.5-turbo",
    description:
      "Most capable GPT-3.5 model, optimized for chat at 1/10th the cost.",
    type: "GPT-3.5",
    strengths: "Chat optimization, cost-effective",
    maxTokens: 4097,
    trainingData: "Up to Sep 2021",
    pricing: 0.0015,
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
    pricing: 0.003,
  },
  {
    id: "gpt-3.5-turbo-0613",
    name: "gpt-3.5-turbo-0613",
    description:
      "Snapshot of gpt-3.5-turbo from June 13th 2023 with function calling data.",
    type: "GPT-3.5",
    strengths: "Snapshot version",
    maxTokens: 4097,
    trainingData: "Up to Sep 2021",
    pricing: 0.0015,
  },
  {
    id: "gpt-3.5-turbo-16k-0613",
    name: "gpt-3.5-turbo-16k-0613",
    description: "Snapshot of gpt-3.5-turbo-16k from June 13th 2023.",
    type: "GPT-3.5",
    strengths: "Extended context, snapshot version",
    maxTokens: 16385,
    trainingData: "Up to Sep 2021",
    pricing: 0.003,
  },
];
