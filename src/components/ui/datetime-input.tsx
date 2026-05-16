"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { DateInput } from "@/components/ui/date-input";
import { TimeInput } from "@/components/ui/time-input";
import { cn } from "@/lib/utils";

type DateTimeInputProps = {
  name: string;
  defaultValue?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  dateIcon?: LucideIcon;
  timeIcon?: LucideIcon;
  className?: string;
};

export function DateTimeInput({
  name,
  defaultValue,
  id,
  required,
  disabled,
  dateIcon,
  timeIcon,
  className,
}: DateTimeInputProps) {
  const initial = parseDefault(defaultValue);
  const [dateIso, setDateIso] = React.useState<string>(initial.date);
  const [timeIso, setTimeIso] = React.useState<string>(initial.time);

  const combined = dateIso && timeIso ? `${dateIso}T${timeIso}` : "";

  return (
    <div className={cn("grid gap-2 sm:grid-cols-[1fr_220px]", className)}>
      <DateInput
        id={id}
        value={dateIso}
        onChange={setDateIso}
        icon={dateIcon}
        disabled={disabled}
      />
      <TimeInput
        value={timeIso}
        onChange={setTimeIso}
        icon={timeIcon}
        disabled={disabled}
      />
      <input
        type="hidden"
        name={name}
        value={combined}
        required={required}
        readOnly
      />
    </div>
  );
}

function parseDefault(v: string | undefined): { date: string; time: string } {
  if (!v) return { date: "", time: "" };
  const [d, t] = v.split("T");
  return { date: d ?? "", time: t ? t.slice(0, 5) : "" };
}
