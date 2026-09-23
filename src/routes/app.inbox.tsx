import { createFileRoute } from "@tanstack/react-router";
import { Mailbox } from "lucide-react";
import { ShareLink } from "@/components/whispr/ShareLink";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Whispr" },
      { name: "description", content: "Anonymous questions people sent to your Whispr link." },
      { property: "og:title", content: "Inbox — Whispr" },
      { property: "og:description", content: "Anonymous questions sent to your Whispr link." },
    ],
  }),
  component: InboxScreen,
});

function InboxScreen() {
  return (
    <div className="pt-8">
      <h1 className="rise display-md">Inbox</h1>
      <p className="rise mt-1 text-[15px] text-muted-foreground">Anonymous questions land here.</p>

      <div className="rise card-soft mt-8 px-6 py-14 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-muted-foreground">
          <Mailbox className="size-6" strokeWidth={1.7} />
        </div>
        <p className="mt-5 text-[19px] font-semibold tracking-tight">Your inbox is empty</p>
        <p className="mx-auto mt-2 max-w-[30ch] text-[15px] text-muted-foreground text-pretty">
          Share your Whispr link to start receiving messages.
        </p>
      </div>

      <div className="rise mt-4">
        <ShareLink username="nandith" />
      </div>
    </div>
  );
}
