"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggleBtn() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key.toLowerCase() === "d") {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resolvedTheme]);

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {/* Take by Shadcn Theme Toggle Icon :) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color="currentColor"
        className="size-4 -rotate-45"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="currentColor"
          strokeWidth="2"
        ></path>
        <path
          d="M5 20L19 5"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </Button>
  );
}
