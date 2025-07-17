import { useState } from "react";
import { ISite } from "@/model/site";

type LogEntry = {
  timestamp: Date;
  level: "info" | "warn" | "error";
  message: string;
};

const fakeLogs: LogEntry[] = [
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: "info",
    message: "Server started successfully.",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    level: "warn",
    message: "High memory usage detected.",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    level: "error",
    message: "Failed to connect to database.",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    level: "info",
    message: "New user registered: john.doe@example.com",
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60),
    level: "info",
    message: "Backup completed successfully.",
  },
];

export default function Logs({ site }: { site: ISite }) {
  // For now, using fakeLogs. Later replace with real fetched logs.
  const [logs] = useState<LogEntry[]>(fakeLogs);

  // Color coding for levels
  const levelColors = {
    info: "text-blue-400",
    warn: "text-yellow-400",
    error: "text-red-500",
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Logs for {site.metadata.title}</h2>
      <div className="h-80 overflow-y-auto rounded-md border border-gray-800 bg-gray-900 p-4 text-sm font-mono text-gray-300">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs available.</p>
        ) : (
          logs.map(({ timestamp, level, message }, i) => (
            <div key={i} className="mb-2 flex gap-3 items-start">
              <time className="flex-shrink-0 w-32 text-gray-500" dateTime={timestamp.toISOString()}>
                {timestamp.toLocaleTimeString()}
              </time>
              <span className={`font-semibold ${levelColors[level]}`}>{level.toUpperCase()}</span>
              <p className="flex-1">{message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
