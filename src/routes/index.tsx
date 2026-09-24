import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Whispr — What do your friends really think?" },
      {
        name: "description",
        content:
          "One link. Anonymous questions and private chats — with a reveal that only the sender controls.",
      },
      { property: "og:title", content: "Whispr — What do your friends really think?" },
      {
        property: "og:description",
        content: "Share one link and hear what people really think. Anonymous questions and private chats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-bar sticky top-0 z-50 border-b border-border">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="text-[17px] font-semibold tracking-tight">
            Whispr
          </Link>
          <Link to="/app" className="text-[13px] text-primary">
            Open app
          </Link>
        </div>
      </header>

      <section className="px-5 pt-20 pb-16 text-center sm:pt-28">
        <p className="rise text-[15px] font-medium tracking-tight text-primary">Whispr</p>
        <h1 className="rise display-xl mx-auto mt-3 max-w-[16ch] text-balance">
          What do your friends really think?
        </h1>
        <p className="rise lede mx-auto mt-6 max-w-[46ch] text-pretty">
          Share one link. Get anonymous questions — or a private chat where only the sender decides if the mask
          ever comes off.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/app" className="pill-primary px-7 py-3 text-[17px]">
            Create your Whispr
          </Link>

        </div>

        <div className="rise mx-auto mt-16 w-full max-w-[340px]">
          <PhoneMock />
        </div>
      </section>

      <section id="how" className="bg-surface px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="display-lg max-w-[14ch] text-balance">Two ways in. One link.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <Feature
              icon={<Sparkles className="size-5" strokeWidth={1.8} />}
              title="Ask anonymously"
              body="A single question, sent without a name. No account, no trace — it just lands in their inbox."
            />
            <Feature
              icon={<MessageCircle className="size-5" strokeWidth={1.8} />}
              title="Start a private chat"
              body="Keep talking. A real conversation with bubbles, timestamps and read states — still nameless."
            />
            <Feature
              icon={<Lock className="size-5" strokeWidth={1.8} />}
              title="Reveal on your terms"
              body="They can ask who you are. Only you can answer that, and staying anonymous is always allowed."
            />
          </div>
        </div>
      </section>



      <footer className="border-t border-border px-5 py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-[12px] text-muted-foreground">
          <span>Whispr</span>
          <span>Anonymous by default.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="card-soft h-full p-7">
      <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
        {icon}
      </div>
      <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground text-pretty">{body}</p>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="rounded-[2.75rem] bg-foreground p-2.5 shadow-[var(--shadow-lift)]">
      <div className="overflow-hidden rounded-[2.25rem] bg-background">
        <div className="flex items-center justify-center px-4 pt-3 pb-2">
          <div className="h-1.5 w-20 rounded-full bg-border" />
        </div>
        <div className="px-5 pb-7 text-left">
          <div className="mx-auto size-16 rounded-full bg-surface" />
          <p className="mt-3 text-center text-[17px] font-semibold tracking-tight">Nandith</p>
          <p className="text-center text-[13px] text-muted-foreground">@nandith</p>
          <p className="mt-3 text-center text-[15px] tracking-tight">Ask me anything 👀</p>
          <div className="mt-6 space-y-2.5">
            <div className="pill-primary py-3 text-center text-[15px]">Ask anonymously</div>
            <div className="pill-ghost py-3 text-center text-[15px]">Start private chat</div>
          </div>
        </div>
      </div>
    </div>
  );
}
