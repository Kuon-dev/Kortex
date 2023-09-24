/** @jsxImportSource react */
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { getHighlighter } from "shikiji";
import { Button } from "~/integrations/shadcn/ui/button";
import { Textarea } from "~/integrations/shadcn/ui/textarea";
import { usePlaygroundStore, type State } from "./playground-store";
import { toast } from "sonner";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";
import { PlaygroundTokenCounter } from "./playground-token-counter";
// import { Image } from "@unpic/react"
interface PlaygroundPageProps {
  onDataEmit: (data: any) => void;
}

const SubmitModelSchema = z.object({
  model: z.string(),
  systemPrompt: z.string(),
  messages: z.array(z.any()),
  temperature: z.number().min(0).max(1),
  maxLength: z.number().min(0).max(33000),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(0),
  presencePenalty: z.number().min(0),
  stop: z.array(z.union([z.null(), z.string()])),
  newUserPrompt: z.string(),
});

export type SubmitModelSchemaProps = z.infer<typeof SubmitModelSchema>;

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  onDataEmit,
}) => {
  const [systemPrompt, setSystemPrompt] = usePlaygroundStore((s) => [
    s.systemPrompt,
    s.setSystemPrompt,
  ]);
  const [userPrompt, setUserPrompt] = usePlaygroundStore((s) => [
    s.newUserPrompt,
    s.setNewUserPrompt,
  ]);

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

    const dataToEmit = {
      model: model?.name,
      systemPrompt,
      messages,
      temperature: temperature[0],
      maxLength: maxLength[0],
      topP: topP[0],
      frequencyPenalty: frequencyPenalty[0],
      presencePenalty: presencePenalty[0],
      stop,
      newUserPrompt,
    };

    const zodParse = SubmitModelSchema.safeParse(dataToEmit);
    if (zodParse.success) onDataEmit(zodParse.data);
    else
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
        <div className="rounded-md border border-primary bg-muted"></div>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => handleSubmit()}>Submit</Button>
        <Button variant="secondary">
          <span className="sr-only">Show history</span>
          <CounterClockwiseClockIcon className="h-4 w-4" />
        </Button>
        <PlaygroundTokenCounter />
      </div>
    </div>
  );
};
