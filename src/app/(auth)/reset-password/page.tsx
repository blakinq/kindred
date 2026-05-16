import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";
import { ResetPasswordForm } from "./reset-form";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only reachable with a valid session from the email link.
  if (!user) redirect("/forgot-password");

  return (
    <>
      <BackLink href="/login">Back to log in</BackLink>

      <Card tape="coral" className="animate-fade-up">
        <CardContent className="p-8">
          <p className="font-hand text-2xl text-terracotta">new password</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Pick something new
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            For <span className="font-semibold text-ink">{user.email}</span>
          </p>

          <ResetPasswordForm />

          <p className="mt-6 text-center text-sm text-ink-soft">
            Changed your mind?{" "}
            <Link
              href="/app/events"
              className="font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
            >
              Skip
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
