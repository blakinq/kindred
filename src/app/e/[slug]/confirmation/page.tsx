import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkle, Squiggle } from "@/components/decorations";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container py-6">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 font-display text-lg font-bold tracking-tight"
        >
          kindred
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
        </Link>
      </header>
      <main className="container flex flex-1 items-center justify-center pb-16">
        <Card tape="coral" className="w-full max-w-md animate-fade-up">
          <CardContent className="flex flex-col items-center gap-5 p-10 text-center">
            <div className="relative">
              <Sparkle className="absolute -left-6 top-0 h-5 w-5 -rotate-12 text-mustard" />
              <Sparkle className="absolute -right-6 top-2 h-4 w-4 rotate-12 text-terracotta" />
              <div className="text-6xl">🎉</div>
            </div>
            <p className="font-hand text-2xl text-terracotta">we got it</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance">
              Your reply is in.
            </h1>
            <p className="text-ink-soft">
              The host can see your response. Need to change anything? Open the
              invite link again any time.
            </p>
            <Squiggle className="my-2 h-3 w-32 text-terracotta" />
            <Button asChild variant="outline">
              <Link href={`/e/${slug}`}>Back to the invitation</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
