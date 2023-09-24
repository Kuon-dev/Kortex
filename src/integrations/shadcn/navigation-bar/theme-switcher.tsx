/** @jsxImportSource react */
// ThemeSwitcher.tsx
import React, { useState } from "react";
import { useThemeStore } from "./theme-store";
import { Button } from "../ui/button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;
    toggleTheme();
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Button onClick={() => handleClick()} className="" disabled={isDisabled}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeSwitcher;
