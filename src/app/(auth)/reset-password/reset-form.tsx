"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "../actions";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPasswordAction, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
          autoFocus
        />
        <p className="text-xs text-ink-soft normal-case tracking-normal">
          At least 8 characters.
        </p>
      </div>
      {state?.error && (
        <p
          className="rounded-lg border-2 border-terracotta-deep bg-terracotta/15 px-3 py-2 text-sm text-terracotta-deep"
          role="alert"
        >
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Saving…" : "Save new password →"}
      </Button>
    </form>
  );
}
