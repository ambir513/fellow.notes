"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  /** ISO date string (with timezone offset) the countdown should target. */
  target: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const UNITS: { key: keyof Omit<TimeLeft, "done">; label: string }[] = [
  { key: "days", label: "D" },
  { key: "hours", label: "H" },
  { key: "minutes", label: "M" },
  { key: "seconds", label: "S" },
];

export function CountdownTimer({ target, className }: CountdownTimerProps) {
  // Start as null so server and first client render match (avoids hydration
  // mismatch), then fill in the real value on mount.
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null);

  React.useEffect(() => {
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const display = timeLeft ?? {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  };

  if (timeLeft?.done) {
    return (
      <div
        className={cn(
          "border-border/60 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-muted-foreground text-xs font-medium">
          We&apos;re live
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-border/60 inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 sm:gap-1.5 sm:px-4",
        className,
      )}
      role="timer"
      aria-live="polite"
      aria-label={`Launching in ${display.days} days, ${display.hours} hours, ${display.minutes} minutes and ${display.seconds} seconds`}
    >
      {UNITS.map(({ key, label }, i) => (
        <React.Fragment key={key}>
          {i > 0 && (
            <span
              className="text-muted-foreground/30 font-mono text-xs sm:text-sm"
              aria-hidden="true"
            >
              :
            </span>
          )}
          <span className="flex items-baseline gap-1">
            <span className="font-mono text-xs font-medium tabular-nums tracking-tight sm:text-sm">
              {String(display[key]).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground/60 text-[9px] font-medium uppercase sm:text-[10px]">
              {label}
            </span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
