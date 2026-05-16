import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Squiggle,
  Sparkle,
  DotGrid,
  Stamp,
  CornerCurl,
} from "@/components/decorations";
import { ScrollToTop } from "@/components/scroll-to-top";
import { cn } from "@/lib/utils";

const useCases = [
  { emoji: "🍝", title: "Dinner parties", tilt: "-rotate-2", bg: "bg-mustard/30" },
  { emoji: "🎂", title: "Birthdays", tilt: "rotate-1", bg: "bg-coral/50" },
  { emoji: "🧺", title: "Picnics", tilt: "-rotate-1", bg: "bg-olive/25" },
  { emoji: "🚿", title: "Showers", tilt: "rotate-2", bg: "bg-ocean/15" },
  { emoji: "🎲", title: "Game nights", tilt: "-rotate-1", bg: "bg-terracotta/20" },
  { emoji: "🤝", title: "Meetups", tilt: "rotate-1", bg: "bg-paper-deep" },
];

const features = [
  {
    n: "01",
    title: "RSVPs that just work",
    body: "Share one link. Guests reply with no account, no app, no nonsense.",
    accent: "terracotta",
  },
  {
    n: "02",
    title: "A budget you can see",
    body: "Estimated and actual costs, per-person math that updates with RSVPs.",
    accent: "mustard",
  },
  {
    n: "03",
    title: "Potluck without the chaos",
    body: "List what's needed. Guests pick what they'll bring. No double-buying.",
    accent: "olive",
  },
  {
    n: "04",
    title: "Tasks, handed off",
    body: "Break prep into pieces and stop carrying the whole thing yourself.",
    accent: "ocean",
  },
];

const messStuff = [
  "📱 Three group chats and a DM",
  "📊 A spreadsheet only you check",
  "🗒️ Sticky notes on the fridge",
  "💸 Splitwise that nobody pays",
  "📝 A notes app you'll forget",
];

const winStuff = [
  "One link, sent anywhere",
  "RSVPs come back to you",
  "A budget that adds itself up",
  "Food list everyone can claim",
  "Tasks you can actually hand off",
];

const steps = [
  {
    n: "01",
    kicker: "first",
    frame: "new event",
    title: "Make it",
    body: "Name, date, time. Done in a minute.",
    accent: "terracotta",
    preview: (
      <div className="space-y-4">
        <div className="rounded-md border-2 border-dashed border-rule bg-paper px-2.5 py-1.5">
          <div className="text-[9px] font-display font-bold uppercase tracking-wider text-ink-soft">
            Title
          </div>
          <div className="font-hand text-lg leading-none text-ink">
            Friday dinner
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-md border-2 border-dashed border-rule bg-paper px-2.5 py-1.5">
            <div className="text-[9px] font-display font-bold uppercase tracking-wider text-ink-soft">
              When
            </div>
            <div className="text-xs font-semibold tabular-nums">
              Fri · Apr 12 · 7:00 PM
            </div>
          </div>
          <button
            type="button"
            disabled
            className="rounded-md border-2 border-ink bg-terracotta px-3 text-[10px] font-display font-bold uppercase tracking-wider text-paper-light shadow-stamp-sm"
          >
            Save
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-display font-bold uppercase tracking-wider text-olive">
          <span
            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-olive text-[9px]"
            aria-hidden
          >
            ✓
          </span>
          Saved · 8:42 PM
        </div>
      </div>
    ),
  },
  {
    n: "02",
    kicker: "then",
    frame: "send link",
    title: "Share it",
    body: "One link goes wherever. Text, group chat, email.",
    accent: "mustard",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-md border-2 border-dashed border-rule bg-paper px-2.5 py-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
          <code className="flex-1 truncate font-mono text-[11px] text-ink-soft">
            kindred.app/e/oak42
          </code>
          <span className="rounded border border-ink/50 bg-mustard px-1.5 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider text-ink">
            Copy
          </span>
        </div>
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm border-2 border-ink/30 bg-ocean/15 px-3 py-1.5 text-[11px] text-ink">
          you're invited! tap to RSVP
          <span className="block text-[9px] text-ink-soft">
            kindred.app/e/oak42
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-display font-bold uppercase tracking-wider text-ink-soft">
          <span className="rounded border border-ink/40 bg-paper-deep px-1.5 py-0.5">
            iMessage
          </span>
          <span className="rounded border border-ink/40 bg-paper-deep px-1.5 py-0.5">
            WhatsApp
          </span>
          <span className="rounded border border-ink/40 bg-paper-deep px-1.5 py-0.5">
            Email
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    kicker: "and then",
    frame: "live count",
    title: "Watch it work",
    body: "RSVPs roll in. People claim food. Tasks get checked off.",
    accent: "olive",
    preview: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md border-2 border-ink/30 bg-olive/15 p-1.5">
            <div className="font-display text-lg font-bold leading-none text-olive">
              8
            </div>
            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-soft">
              Going
            </div>
          </div>
          <div className="rounded-md border-2 border-ink/30 bg-mustard/20 p-1.5">
            <div className="font-display text-lg font-bold leading-none">
              3
            </div>
            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-soft">
              Maybe
            </div>
          </div>
          <div className="rounded-md border-2 border-ink/30 bg-paper-deep p-1.5">
            <div className="font-display text-lg font-bold leading-none text-ink-soft">
              2
            </div>
            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-soft">
              Quiet
            </div>
          </div>
        </div>
        <ul className="space-y-2 text-[11px]">
          <li className="flex items-center gap-1.5">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm border-2 border-olive bg-olive text-[8px] text-paper-light">
              ✓
            </span>
            <span className="line-through text-ink-soft">Maya, chips</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm border-2 border-ink/40"
              aria-hidden
            />
            <span>Ben, dessert</span>
          </li>
        </ul>
      </div>
    ),
  },
];

const quotes = [
  {
    text: "I stopped chasing people for RSVPs.",
    author: "Maya, Brooklyn dinners",
    tilt: "-rotate-2",
    tape: "mustard" as const,
  },
  {
    text: "We didn't double-buy chips this time.",
    author: "Ben & Sasha, block party",
    tilt: "rotate-1",
    tape: "coral" as const,
  },
  {
    text: "Even my dad RSVP'd. From his phone.",
    author: "Dom, birthday for mum",
    tilt: "-rotate-1",
    tape: "olive" as const,
  },
];

const faq = [
  {
    q: "Do my guests need an account?",
    a: "Nope. They open the link, pick a reply, hit send. That's it. They can come back later to update it from the same link.",
  },
  {
    q: "How much does it cost?",
    a: "Free while we're small. If we ever charge, the basics stay free: events, RSVPs, sharing.",
  },
  {
    q: "Is my event private?",
    a: "You choose. Default is anyone with the link can RSVP. Switch to invite-only and only emails you've added can reply.",
  },
  {
    q: "What about plus-ones and dietary stuff?",
    a: "Built in. Toggle plus-ones on or off, set a max, and guests can leave dietary notes when they RSVP.",
  },
  {
    q: "Does this work on my phone?",
    a: "Yes, the guest invite page is mobile-first. Most of your guests will open it on a phone anyway.",
  },
  {
    q: "Can I host more than one event?",
    a: "As many as you want. They live in your kindred dashboard, upcoming and past.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="flex items-baseline gap-1 font-display text-2xl font-bold tracking-tight"
        >
          kindred
          <span className="h-2 w-2 rounded-full bg-terracotta" aria-hidden />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Start planning</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container relative pb-20 pt-16 md:pt-24">
        <DotGrid className="absolute -left-8 top-8 h-32 w-32 text-ink/20" />
        <Sparkle className="absolute right-24 top-12 h-8 w-8 rotate-12 text-mustard animate-wobble" />
        <Squiggle className="absolute right-8 top-32 h-6 w-32 text-terracotta" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 text-ink-soft">
            <span className="font-hand text-2xl text-terracotta">a tiny planning tool</span>
            <Squiggle className="h-2 w-12 text-terracotta" />
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-balance md:text-7xl">
            Plan dinners.
            <br />
            Plan birthdays.
            <br />
            <span className="relative inline-block">
              Plan whatever's good.
              <span
                className="absolute -bottom-2 left-0 h-3 w-full -rotate-1 bg-mustard/60"
                aria-hidden
              />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink-soft text-pretty">
            Kindred is a small shared workspace for whoever's bringing what,
            and who's actually coming.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">Start an event →</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">I have an account</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-ink-soft">
            Free while we're small. No credit card.
          </p>
        </div>
      </section>

      {/* Use cases — sticker grid */}
      <section className="container py-12">
        <div className="mb-6 flex items-center gap-3">
          <Stamp className="text-terracotta-deep">For</Stamp>
          <span className="font-hand text-xl text-ink-soft">all the small ones</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {useCases.map((u) => (
            <div
              key={u.title}
              className={`${u.tilt} ${u.bg} rounded-2xl border-2 border-ink/80 p-5 text-center shadow-stamp transition-transform hover:rotate-0 hover:-translate-y-1`}
            >
              <div className="text-4xl" aria-hidden>
                {u.emoji}
              </div>
              <div className="mt-2 font-display text-sm font-semibold text-ink">
                {u.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instead of... */}
      <section className="container py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <Stamp className="text-ink-soft">Instead of</Stamp>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
              Three group chats.
              <br />
              One missing pie.
            </h2>
            <p className="mt-5 max-w-md text-ink-soft">
              You know the drill. The stuff you currently glue together to host
              a thing:
            </p>
            <ul className="mt-6 space-y-2.5">
              {messStuff.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-3 rounded-xl border-2 border-dashed border-rule bg-paper-deep/30 px-4 py-2.5 text-[15px] text-ink-soft line-through decoration-terracotta decoration-2"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <CornerCurl className="absolute -right-2 -top-2 h-10 w-10 text-terracotta" />
            <Stamp className="text-terracotta-deep">kindred</Stamp>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
              One page.
              <br />
              <span className="relative inline-block">
                Everyone sees it.
                <span
                  className="absolute -bottom-1 left-0 h-3 w-full -rotate-1 bg-mustard/60"
                  aria-hidden
                />
              </span>
            </h2>
            <p className="mt-5 max-w-md text-ink-soft">
              Invites, RSVPs, budget, food, and tasks, all in one shared event:
            </p>
            <ul className="mt-6 space-y-2.5">
              {winStuff.map((w, i) => (
                <li
                  key={w}
                  className={`flex items-center gap-3 rounded-xl border-2 border-ink/85 px-4 py-2.5 text-[15px] font-medium shadow-stamp-sm ${
                    i % 2 === 0 ? "bg-paper-light" : "bg-mustard/15"
                  }`}
                >
                  <span
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-ink bg-olive text-paper-light"
                    aria-hidden
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12 L10 17 L19 7"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it goes — trail of scene cards */}
      <section className="container py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-hand text-2xl text-terracotta">
              three little steps
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              How it goes
            </h2>
            <p className="mt-3 text-ink-soft">
              From idea to RSVPs in the time it takes to make a pot of coffee.
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Stamp className="text-ocean">~ 5 min ~</Stamp>
            <Sparkle
              className="h-5 w-5 -rotate-12 text-mustard"
              aria-hidden
            />
          </div>
        </div>

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <DotGrid
            className="pointer-events-none absolute -left-10 -top-6 hidden h-20 w-20 text-rule md:block"
            aria-hidden
          />
          <DotGrid
            className="pointer-events-none absolute -right-10 -bottom-6 hidden h-20 w-20 text-rule md:block"
            aria-hidden
          />

          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              <article
                className={cn(
                  "paper relative h-full rounded-2xl border-2 border-ink/85 p-6 transition-transform",
                  "hover:rotate-0 hover:-translate-y-1",
                  i === 0 && "md:-rotate-[1.2deg] md:translate-y-2",
                  i === 1 && "md:rotate-[0.6deg] md:-translate-y-2",
                  i === 2 && "md:-rotate-[0.8deg] md:translate-y-1",
                )}
              >
                {/* Step tab on the corner */}
                <div
                  className={cn(
                    "absolute -left-2 -top-3 inline-flex items-center gap-1.5 rounded-lg border-2 border-ink px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] shadow-stamp-sm",
                    s.accent === "terracotta"
                      ? "bg-terracotta text-paper-light"
                      : s.accent === "mustard"
                        ? "bg-mustard text-ink"
                        : "bg-olive text-paper-light",
                  )}
                >
                  <span className="opacity-70">Step</span>
                  <span className="tabular-nums">{s.n}</span>
                </div>

                <div className="mt-4">
                  <p className="font-hand text-lg text-terracotta">{s.kicker}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{s.body}</p>
                </div>

                {/* Preview window — framed like a tiny app screen */}
                <div className="mt-5 overflow-hidden rounded-xl border-2 border-ink/40 bg-paper-light shadow-stamp-sm">
                  <div className="flex items-center gap-1 border-b-2 border-ink/40 bg-paper-deep px-3 py-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-terracotta/70"
                      aria-hidden
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-mustard/80"
                      aria-hidden
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-olive/70"
                      aria-hidden
                    />
                    <span className="ml-auto font-display text-[9px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                      {s.frame}
                    </span>
                  </div>
                  <div className="p-3.5">{s.preview}</div>
                </div>
              </article>

            </li>
          ))}
        </ol>
      </section>

      {/* Features — numbered index cards */}
      <section className="container py-20">
        <div className="mb-10 max-w-2xl">
          <p className="font-hand text-2xl text-terracotta">four little things</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.n}
              className="paper relative rounded-2xl border-2 border-ink/85 p-7"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-ink font-display text-lg font-bold ${
                    f.accent === "terracotta"
                      ? "bg-terracotta text-paper-light"
                      : f.accent === "mustard"
                        ? "bg-mustard text-ink"
                        : f.accent === "olive"
                          ? "bg-olive/80 text-paper-light"
                          : "bg-ocean text-paper-light"
                  }`}
                >
                  {f.n}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Small wins — sticky note quotes */}
      <section className="container py-20">
        <div className="mb-10 max-w-2xl">
          <p className="font-hand text-2xl text-terracotta">small wins</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            The kind of stuff
            <br />
            you'll say after.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className={`paper relative rounded-2xl border-2 border-ink/85 p-7 transition-transform hover:rotate-0 hover:-translate-y-1 ${q.tilt}`}
            >
              <span
                className={`tape rounded-sm ${
                  q.tape === "coral"
                    ? "tape-coral"
                    : q.tape === "olive"
                      ? "tape-olive"
                      : ""
                }`}
                aria-hidden
              />
              <blockquote className="font-hand text-3xl leading-[1.15] text-ink">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {q.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ — what people ask */}
      <section className="container py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-hand text-2xl text-terracotta">yes, but…</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            What people ask
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl gap-3">
          {faq.map((f) => (
            <details
              key={f.q}
              className="paper group rounded-2xl border-2 border-ink/85 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-bold tracking-tight">
                {f.q}
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-light text-lg font-bold transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="border-t-2 border-dashed border-rule px-5 pb-5 pt-3 text-[15px] text-ink-soft">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Big CTA */}
      <section className="container py-20">
        <div className="paper relative mx-auto max-w-3xl rounded-3xl border-2 border-ink/85 p-12 text-center md:p-16">
          <span className="tape rounded-sm" aria-hidden />
          <Sparkle className="absolute -left-3 top-12 h-7 w-7 -rotate-12 text-mustard" />
          <Sparkle className="absolute bottom-10 right-4 h-5 w-5 rotate-12 text-terracotta" />
          <p className="font-hand text-2xl text-terracotta">go on</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl text-balance">
            Host something good.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            Five minutes to set it up. The rest takes care of itself.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/signup">Create your first event</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container flex items-center justify-between border-t-2 border-dashed border-rule py-8 text-sm text-ink-soft">
        <span className="font-display font-semibold text-ink">kindred</span>
        <span>plan gatherings, together</span>
      </footer>

      <ScrollToTop />
    </div>
  );
}
