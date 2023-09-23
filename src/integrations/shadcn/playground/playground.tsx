/** @jsxImportSource react */
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "~/integrations/shadcn/ui/button";
import { Textarea } from "~/integrations/shadcn/ui/textarea";
// import { Image } from "@unpic/react"

import { ModelSelector } from "./components/model-selector";
import { models, types } from "./data/models";
import { MaxLengthSelector } from "./components/selector-maxlength";
import { TemperatureSelector } from "./components/selector-temperature";
import { TopPSelector } from "./components/selector-top-p";
import { FrequencyPenaltySelector } from "./components/selector-frequency-penalty";
import { PresencePenaltySelector } from "./components/selector-presence-penalty";

export default function PlaygroundPage() {
  return (
    <>
      <div className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
              <ModelSelector types={types} models={models} />
              <TemperatureSelector />
              <MaxLengthSelector />
              <TopPSelector />
              <FrequencyPenaltySelector />
              <PresencePenaltySelector />
            </div>
            <div className="md:order-1">
              <div className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea
                      placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                    />
                    <div className="rounded-md border bg-muted"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
