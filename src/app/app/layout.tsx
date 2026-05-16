import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("name")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    profile?.name ||
    (user.user_metadata?.name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Friend";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b-2 border-dashed border-rule bg-paper/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/app/events"
            className="inline-flex items-baseline gap-1 font-display text-xl font-bold tracking-tight"
          >
            kindred
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
          </Link>
          <UserMenu name={displayName} email={user.email ?? ""} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
