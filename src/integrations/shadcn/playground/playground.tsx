/** @jsxImportSource react */
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Button } from "~/integrations/shadcn/ui/button";
import { Textarea } from "~/integrations/shadcn/ui/textarea";
import { usePlaygroundStore } from "./playground-store";
import { toast } from "sonner";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";
import { PlaygroundTokenCounter } from "./playground-token-counter";
import type { MessageChat } from "./playground-store";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { Image } from "@unpic/react"
const SubmitModelSchema = z.object({
  model: z.union([z.string(), z.undefined()]),
  systemPrompt: z.string(),
  messages: z.array(z.any()),
  temperature: z.number().min(0).max(2),
  maxLength: z.number().min(0).max(33000),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(0).max(2),
  presencePenalty: z.number().min(0).max(2),
  stop: z.optional(z.array(z.string())),
  newUserPrompt: z.string(),
});

export type SubmitModelSchemaProps = z.infer<typeof SubmitModelSchema>;

interface PlaygroundPageProps {
  onDataEmit: (data: any) => void;
  streamedMessage: string; // New prop for streamed messages
  isStreamingComplete: boolean;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  onDataEmit,
  streamedMessage,
  isStreamingComplete,
}) => {
  const [systemPrompt, setSystemPrompt] = usePlaygroundStore((s) => [
    s.systemPrompt,
    s.setSystemPrompt,
  ]);
  const [userPrompt, setUserPrompt] = usePlaygroundStore((s) => [
    s.newUserPrompt,
    s.setNewUserPrompt,
  ]);
  const [chatMessages, setChatMessages, addChatMessages, updateChatMessage] =
    usePlaygroundStore((s) => [
      s.messages,
      s.setMessageChat,
      s.addMessage,
      s.updateMessage,
    ]);

  const [lastAssistantMessageId, setLastAssistantMessageId] = useState<
    string | null
  >(null);

  const handleUserMessage = (message: string) => {
    const userMessage: MessageChat = {
      id: Date.now().toString(),
      sender: "user",
      message,
      timestamp: new Date().toISOString(),
    };
    addChatMessages(userMessage);
    setLastAssistantMessageId(null);
  };

  useEffect(() => {
    let modifiedStream = streamedMessage;
    const regex = /`` `|` ``/g;
    modifiedStream = modifiedStream.replace(regex, "```");

    if (modifiedStream) {
      if (lastAssistantMessageId) {
        const updatedMessage = {
          message: modifiedStream,
        };
        updateChatMessage(lastAssistantMessageId, updatedMessage);
      } else {
        const newAssistantMessage: MessageChat = {
          id: Date.now().toString(),
          sender: "assistant",
          message: modifiedStream,
          timestamp: new Date().toISOString(),
        };
        addChatMessages(newAssistantMessage);
        setLastAssistantMessageId(newAssistantMessage.id);
      }
    }
    console.log(chatMessages);
  }, [streamedMessage, isStreamingComplete]);

  const store = usePlaygroundStore.getState();
  const handleSubmit = () => {
    const {
      model,
      systemPrompt,
      messages,
      temperature,
      maxLength,
      topP,
      frequencyPenalty,
      presencePenalty,
      stop,
      newUserPrompt,
    } = store;
    if (!model) {
      toast("error", {
        description: "There is no model selected",
      });
      return;
    }

    const dataToEmit: SubmitModelSchemaProps = {
      model: model.name,
      systemPrompt,
      messages,
      temperature: temperature[0],
      maxLength: maxLength[0],
      topP: topP[0],
      frequencyPenalty: frequencyPenalty[0],
      presencePenalty: presencePenalty[0],
      newUserPrompt,
    };
    if (stop && stop.length > 0) {
      dataToEmit.stop = stop;
    }

    const zodParse = SubmitModelSchema.safeParse(dataToEmit);
    if (zodParse.success) {
      onDataEmit(zodParse.data);
      handleUserMessage(userPrompt);
    } else
      toast("error", {
        description: (
          <ScrollArea className="h-64 mt-2 w-[320px] rounded-md bg-slate-950 p-4">
            <pre className="h-auto">
              <code className="text-white">
                {JSON.stringify(zodParse.error, null, 2)}
              </code>
            </pre>
          </ScrollArea>
        ),
      });
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex flex-col h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] gap-5 max-h-full">
          <Textarea
            placeholder="System prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="h-full"
          />
          <Textarea
            placeholder="User prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="h-full"
          />
        </div>
        <ScrollArea className="rounded-md border border-primary bg-slate-950 py-4 px-2 max-h-[48rem]">
          {chatMessages.map((chat) => (
            <div key={chat.id} className={`message ${chat.sender}`}>
              <div
                className={cn(
                  "flex w-full flex-col gap-2 rounded-lg px-3 py-2 text-sm my-3",
                  chat.sender === "user"
                    ? "w-max ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary",
                )}
              >
                {chat.sender === "assistant" ? (
                  <ReactMarkdown
                    children={chat.message}
                    components={{
                      code(props) {
                        const { children, className, inline, node, ...rest } =
                          props;
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...rest}
                            children={String(children).replace(/\n$/, "")}
                            style={vscDarkPlus}
                            language={match[1]}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                ) : (
                  chat.message
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => handleSubmit()} disabled={!isStreamingComplete}>
          Submit
        </Button>
        <Button variant="secondary">
          <span className="sr-only">Show history</span>
          <CounterClockwiseClockIcon className="h-4 w-4" />
        </Button>
        <PlaygroundTokenCounter />
      </div>
    </div>
  );
};
