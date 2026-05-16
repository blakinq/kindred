"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const params = useSearchParams();
  const next = params.get("next") ?? "";
  const linkError = params.get("error") === "reset_link_invalid";

  return (
    <>
      <BackLink href="/">Back to home</BackLink>

      <Card tape="mustard" className="animate-fade-up">
        <CardContent className="p-8">
          <p className="font-hand text-2xl text-terracotta">welcome back</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Let's get planning
          </h1>

          {linkError && (
            <p className="mt-4 rounded-lg border-2 border-mustard bg-mustard/20 px-3 py-2 text-sm text-ink">
              That reset link expired or was already used. Request a new one
              from the <Link href="/forgot-password" className="font-semibold underline">forgot password</Link> page.
            </p>
          )}

          <form action={formAction} className="mt-8 space-y-5">
            <input type="hidden" name="next" value={next} />
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
              />
              <Link
                href="/forgot-password"
                className="block text-right text-xs font-display font-semibold text-terracotta-deep underline decoration-2 underline-offset-2 hover:text-terracotta"
              >
                Forgot password?
              </Link>
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
              {pending ? "Signing in…" : "Continue →"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-soft">
            New to kindred?{" "}
            <Link
              href="/signup"
              className="font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
            >
              Make an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
