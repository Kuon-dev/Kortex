/** @jsxImportSource react */
import { CodeViewer } from "./components/code-viewer";
import { Separator } from "~/integrations/shadcn/ui/separator";
import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
import { PresetShare } from "./components/preset-share";
import { presets } from "./data/presets";
import { ThemeSwitcher } from "../navigation-bar/theme-switcher";

export const PlaygroundToolbar = () => (
  <>
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 className="text-lg font-semibold">Playground</h2>
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        <PresetSelector presets={presets} />
        <PresetSave />
        <div className="hidden space-x-2 md:flex">
          <CodeViewer />
          <PresetShare />
        </div>
        <PresetActions />
        <ThemeSwitcher />
      </div>
    </div>
    <Separator />
  </>
);
