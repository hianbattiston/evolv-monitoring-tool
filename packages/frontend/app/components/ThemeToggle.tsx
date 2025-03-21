"use client";

import { useTheme } from "@/contexts/ThemeContext";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-full bg-[var(--evolv-background)] hover:bg-[var(--evolv-background-alt)] dark:bg-[var(--evolv-background-dark)] dark:hover:bg-[var(--evolv-background-dark-alt)] border border-[var(--evolv-border)] dark:border-[var(--evolv-border-dark)] transition-all duration-300"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
