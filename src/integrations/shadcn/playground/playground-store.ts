import type { Model } from "./data/models";
import { create } from "zustand";

// Define the Chat interface
export interface MessageChat {
  id: string;
  sender: "user" | "assistant" | "system";
  message: string;
  timestamp: string;
}

// Define the state
export type State = {
  model: Model<string> | null;
  systemPrompt: string;
  messages: MessageChat[];
  redirects: string;
  temperature: number[];
  maxLength: number[];
  topP: number[];
  frequencyPenalty: number[];
  presencePenalty: number[];
  stop: string[];
  newUserPrompt: string;
};

type Action = {
  setModel: (model: Model<string>) => void;
  setSystemPrompt: (prompt: string) => void;
  addMessage: (chat: MessageChat) => void;
  updateMessage: (id: string, updatedChat: Partial<MessageChat>) => void;
  setMessageChat: (chat: MessageChat[]) => void;
  setRedirects: (redirects: string) => void;
  setTemperature: (temperature: number[]) => void;
  setMaxLength: (maxLength: number[]) => void;
  setTopP: (topP: number[]) => void;
  setFrequencyPenalty: (penalty: number[]) => void;
  setPresencePenalty: (penalty: number[]) => void;
  setStop: (stop: string[]) => void;
  setNewUserPrompt: (newUserPrompt: string) => void;
};

export const usePlaygroundStore = create<State & Action>((set) => ({
  model: null,
  systemPrompt: "You are a helpful assistant",
  messages: [
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
    {
      id: "1695578876987",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:07:56.987Z",
    },
    {
      id: "1695578878807",
      sender: "assistant",
      message:
        "  Why  don 't  scientists  trust  atoms ?\n\n Because  they  make  up  everything ! ",
      timestamp: "2023-09-24T18:07:58.807Z",
    },
    {
      id: "1695578881723",
      sender: "user",
      message: "Tell me a joke",
      timestamp: "2023-09-24T18:08:01.723Z",
    },
    {
      id: "1695578882505",
      sender: "assistant",
      message:
        "  Sure ,  here 's  a  classic  one :  Why  don 't  scientists  trust  atoms ?  \n\n Because  they  make  up  everything !",
      timestamp: "2023-09-24T18:08:02.505Z",
    },
  ],
  redirects: "",
  temperature: [0.9],
  maxLength: [256],
  topP: [0.9],
  frequencyPenalty: [0],
  presencePenalty: [0],
  stop: [],
  newUserPrompt: "Tell me a joke",
  setModel: (model) => set({ model }),
  setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (id, updatedChat) =>
    set((state) => {
      const updatedMessages = state.messages.map((chat) => {
        if (chat.id === id) {
          return { ...chat, ...updatedChat };
        }
        return chat;
      });
      return { messages: updatedMessages };
    }),
  setMessageChat: (chat) => set({ messages: chat }),
  setRedirects: (redirects) => set({ redirects }),
  setTemperature: (temperature) => set({ temperature }),
  setMaxLength: (maxLength) => set({ maxLength }),
  setTopP: (topP) => set({ topP }),
  setFrequencyPenalty: (frequencyPenalty) => set({ frequencyPenalty }),
  setPresencePenalty: (presencePenalty) => set({ presencePenalty }),
  setStop: (stop) => set({ stop }),
  setNewUserPrompt: (newUserPrompt) => set({ newUserPrompt }),
}));
