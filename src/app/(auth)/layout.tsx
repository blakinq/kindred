import Link from "next/link";
import { Sparkle } from "@/components/decorations";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Sparkle className="absolute left-12 top-32 h-6 w-6 rotate-12 text-mustard" />
      <Sparkle className="absolute bottom-32 right-12 h-5 w-5 -rotate-12 text-terracotta" />

      <header className="container py-6">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 font-display text-2xl font-bold tracking-tight"
        >
          kindred
          <span className="h-2 w-2 rounded-full bg-terracotta" aria-hidden />
        </Link>
      </header>
      <main className="container flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md space-y-3">{children}</div>
      </main>
    </div>
  );
}
