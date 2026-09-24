import { createFileRoute } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { ShareLink } from "@/components/whispr/ShareLink";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Home — Whispr" },
      { name: "description", content: "Share your Whispr link and read anonymous messages." },
      { property: "og:title", content: "Home — Whispr" },
      { property: "og:description", content: "Share your Whispr link and see what came in." },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  return (
    <div className="pt-8">
      <h1 className="rise display-md text-balance">Hi, Nandith</h1>

      <div className="rise mt-6">
        <ShareLink username="nandith" />
      </div>

      <div className="rise mt-16 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Inbox className="size-6" strokeWidth={1.8} />
        </div>
        <p className="mt-4 text-[19px] font-semibold tracking-tight">No messages yet</p>
        <p className="mx-auto mt-1 max-w-[28ch] text-[15px] text-muted-foreground text-pretty">
          Share your link and anonymous messages will show up here.
        </p>
      </div>
    </div>
  );
}
