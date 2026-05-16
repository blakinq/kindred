"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function CopyInviteLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        readOnly
        value={url}
        onFocus={(e) => e.currentTarget.select()}
        className="h-11 flex-1 rounded-xl border-2 border-dashed border-rule bg-paper px-4 py-2 font-mono text-sm text-ink-soft"
      />
      <Button
        type="button"
        variant={copied ? "secondary" : "outline"}
        onClick={onCopy}
        size="sm"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" /> Copy
          </>
        )}
      </Button>
    </div>
  );
}
