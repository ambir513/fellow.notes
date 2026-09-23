"use client";

import * as React from "react";
import {
  CheckCircle2Icon,
  Loader2Icon,
  MailIcon,
  TicketPercentIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface NotifyFormProps {
  className?: string;
  /**
   * Called with the submitted email. Wire this up to your waitlist
   * provider (Resend, Supabase, a Google Sheet, etc). Defaults to a
   * fake 700ms delay so the UI is demoable out of the box.
   */
  onSubmitEmail?: (email: string) => Promise<void>;
}

export function NotifyForm({ className, onSubmitEmail }: NotifyFormProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("loading");

    try {
      if (onSubmitEmail) {
        await onSubmitEmail(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "border-success/30 bg-success/10 text-success-foreground flex w-full max-w-md items-start gap-3 rounded-lg border px-4 py-3 text-sm",
          className,
        )}
        role="status"
      >
        <CheckCircle2Icon className="size-4 shrink-0 translate-y-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">You&apos;re on the list.</span>
          <span className="text-success-foreground/80">
            We&apos;ll email you the moment FellowNotes launches — plus an
            early-bird discount code for your first subscription.
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full max-w-md flex-col gap-3", className)}
      noValidate
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-start">
        <Field className="w-full flex-1">
          <div className="relative">
            <MailIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="pl-9"
              required
            />
          </div>
          {status === "error" && error && <FieldError>{error}</FieldError>}
        </Field>
        <Button
          type="submit"
          loading={status === "loading"}
          className="w-full shrink-0 sm:w-auto"
        >
          {status === "loading" ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : null}
          Notify me
        </Button>
      </div>

      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <TicketPercentIcon className="size-3.5 shrink-0" />
        <p>
          Early subscribers get an exclusive discount code — no spam, just one
          email at launch.
        </p>
      </div>
    </form>
  );
}
