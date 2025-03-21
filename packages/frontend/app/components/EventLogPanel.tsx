"use client";

import { useState } from "react";
import { EventLog } from "@shared/types/experiments";
import LogItem from "@/components/LogItem";

interface EventLogPanelProps {
  logs: EventLog[];
}

export default function EventLogPanel({ logs }: EventLogPanelProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredLogs =
    filter === "all" ? logs : logs.filter((log) => log.eventType === filter);

  return (
    <aside className="bg-[var(--evolv-card-background)] shadow-[var(--evolv-shadow)] border border-[var(--evolv-border)] rounded-lg p-6 h-full">
      <h2 className="text-xl font-semibold text-[var(--evolv-text)] mb-4">
        Event Log
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex space-x-2 mt-2 md:mt-0 text-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-[var(--evolv-primary)] text-white"
                : "bg-[var(--evolv-background-alt)] text-[var(--evolv-text)]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("visitor")}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              filter === "visitor"
                ? "bg-[var(--evolv-primary)] text-white"
                : "bg-[var(--evolv-background-alt)] text-[var(--evolv-text)]"
            }`}
          >
            Visitors
          </button>
          <button
            onClick={() => setFilter("conversion")}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              filter === "conversion"
                ? "bg-[var(--evolv-primary)] text-white"
                : "bg-[var(--evolv-background-alt)] text-[var(--evolv-text)]"
            }`}
          >
            Conversions
          </button>
          <button
            onClick={() => setFilter("milestone")}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              filter === "milestone"
                ? "bg-[var(--evolv-primary)] text-white"
                : "bg-[var(--evolv-background-alt)] text-[var(--evolv-text)]"
            }`}
          >
            Milestones
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[600px] pr-2">
        {filteredLogs.length > 0 ? (
          <ul className="space-y-3">
            {filteredLogs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-[var(--evolv-text-light)]">
            No logs available
          </div>
        )}
      </div>
    </aside>
  );
}
