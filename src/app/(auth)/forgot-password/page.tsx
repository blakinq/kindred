"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPasswordAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";
import { Sparkle } from "@/components/decorations";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, undefined);

  return (
    <>
      <BackLink href="/login">Back to log in</BackLink>

      <Card tape="mustard" className="animate-fade-up">
        <CardContent className="p-8">
          <p className="font-hand text-2xl text-terracotta">forgot it?</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Reset your password
          </h1>

          {state?.success ? (
            <div className="mt-8 rounded-xl border-2 border-dashed border-olive bg-olive/15 p-5 text-center">
              <Sparkle className="mx-auto h-6 w-6 text-olive" />
              <p className="mt-3 font-display text-base font-bold text-ink">
                Check your inbox
              </p>
              <p className="mt-2 text-sm text-ink-soft">{state.success}</p>
              <p className="mt-3 text-xs text-ink-soft">
                The link expires in 1 hour.
              </p>
            </div>
          ) : (
            <form action={formAction} className="mt-8 space-y-5">
              <p className="text-sm text-ink-soft">
                Enter the email you signed up with. We'll send a link to set a
                new password.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
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
                {pending ? "Sending…" : "Send reset link →"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-ink-soft">
            Remembered it?{" "}
            <Link
              href="/login"
              className="font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
