"use client";

import { formatDistanceToNow } from "@/utils/dateUtils";
import ThemeToggle from "@/components/ThemeToggle";
import { JSX } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  lastUpdated: Date | null;
}

export default function Header({ lastUpdated }: HeaderProps): JSX.Element {
  const { theme } = useTheme();

  return (
    <header className="bg-blur border-b border-[var(--evolv-border)] py-4 mb-6 sticky top-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-2 flex items-center">
            <Image
              src="/logo.webp"
              alt="Evolv AI"
              width={100}
              height={20}
              className={`${theme !== "dark" ? "invert" : ""}`}
            />
          </div>
          <div className="h-6 w-px bg-[var(--evolv-border)] mx-4 hidden md:block"></div>
          <h2 className="text-xl text-[var(--evolv-text)] font-medium hidden md:block">
            Monitoring Tool
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[var(--evolv-background-alt)] px-3 py-1.5 rounded-full text-sm border border-[var(--evolv-border)]">
            <span className="text-[var(--evolv-text-light)] font-medium">
              Last updated:
            </span>
            <span className="text-[var(--evolv-text)]">
              {lastUpdated ? formatDistanceToNow(lastUpdated) : "Never"}
            </span>
            {lastUpdated && (
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
