import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Squiggle } from "@/components/decorations";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-display text-7xl font-bold tracking-tight text-terracotta">
        404
      </p>
      <Squiggle className="h-3 w-32 text-mustard" />
      <h1 className="font-display text-3xl font-bold tracking-tight">
        We couldn't find that one
      </h1>
      <p className="max-w-md text-ink-soft">
        The link might be wrong, or the host may have taken the event down.
      </p>
      <Button asChild>
        <Link href="/">Back home →</Link>
      </Button>
    </div>
  );
}
