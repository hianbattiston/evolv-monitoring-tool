import { EventLog } from "@shared/types/experiments";
import { formatDate } from "@/utils/dateUtils";

interface LogItemProps {
  log: EventLog;
}

export default function LogItem({ log }: LogItemProps) {
  function getEventTypeColor(type: string) {
    switch (type) {
      case "visitor":
        return "bg-blue-100/80 text-black dark:bg-blue-900/30 dark:text-blue-300";
      case "conversion":
        return "bg-green-100/80 text-black dark:bg-green-900/30 dark:text-green-300";
      case "milestone":
        return "bg-purple-100/80 text-black dark:bg-purple-900/30 dark:text-purple-300";
      case "revenue":
        return "bg-yellow-100/80 text-black dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100/80 text-black dark:bg-gray-800/50 dark:text-gray-300";
    }
  }

  return (
    <li className="border border-[var(--evolv-border)] rounded-lg p-3 hover:bg-[var(--evolv-background-alt)] transition-colors duration-150">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(
            log.eventType
          )}`}
        >
          {log.eventType.charAt(0).toUpperCase() + log.eventType.slice(1)}
        </span>
        <span className="text-xs text-[var(--evolv-text-light)]">
          {formatDate(log.timestamp)}
        </span>
      </div>
      <p className="text-sm text-[var(--evolv-text)]">{log.message}</p>
      {log.data && (
        <div className="mt-2 text-xs bg-[var(--evolv-background-alt)] p-2 rounded border border-[var(--evolv-border)]">
          <pre className="whitespace-pre-wrap text-[var(--evolv-text-light)]">
            {JSON.stringify(log.data, null, 2)}
          </pre>
        </div>
      )}
    </li>
  );
}
