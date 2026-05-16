"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signupAction, undefined);

  return (
    <>
      <BackLink href="/">Back to home</BackLink>

      <Card tape="coral" className="animate-fade-up">
        <CardContent className="p-8">
          <p className="font-hand text-2xl text-terracotta">hi there</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Make a kindred account
          </h1>
          <form action={formAction} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="new-password"
                minLength={8}
                required
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
              {pending ? "Making it…" : "Make my account →"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have one?{" "}
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
