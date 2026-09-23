import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Inbox, MessageCircle } from "lucide-react";
import { ShareLink } from "@/components/whispr/ShareLink";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Home — Whispr" },
      { name: "description", content: "Your Whispr overview: share your link, check your inbox and chats." },
      { property: "og:title", content: "Home — Whispr" },
      { property: "og:description", content: "Share your Whispr link and see what came in." },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  return (
    <div className="pt-8">
      <h1 className="rise display-md text-balance">Good evening, Nandith 👋</h1>
      <p className="rise mt-1 text-[15px] text-muted-foreground">Here’s your Whispr today.</p>

      <div className="rise mt-7">
        <ShareLink username="nandith" />
      </div>

      <div className="rise mt-4 grid grid-cols-2 gap-3">
        <Stat value="0" label="Messages" />
        <Stat value="0" label="Conversations" />
      </div>

      <div className="rise card-soft mt-4 divide-y divide-border overflow-hidden">
        <Row to="/app/inbox" icon={<Inbox className="size-[18px]" strokeWidth={1.8} />} title="View inbox" />
        <Row to="/app/chats" icon={<MessageCircle className="size-[18px]" strokeWidth={1.8} />} title="View chats" />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-soft p-5">
      <p className="text-[28px] font-semibold tracking-tight">{value}</p>
      <p className="mt-0.5 text-[13px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ to, icon, title }: { to: "/app/inbox" | "/app/chats"; icon: React.ReactNode; title: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface">
      <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
        {icon}
      </span>
      <span className="flex-1 text-[16px] tracking-tight">{title}</span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
