import { createFileRoute, Link } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { ShareLink } from "@/components/whispr/ShareLink";

export const Route = createFileRoute("/app/chats")({
  head: () => ({
    meta: [
      { title: "Chats — Whispr" },
      { name: "description", content: "Private anonymous conversations and revealed DMs." },
      { property: "og:title", content: "Chats — Whispr" },
      { property: "og:description", content: "Private anonymous conversations and revealed DMs." },
    ],
  }),
  component: ChatsScreen,
});

function ChatsScreen() {
  return (
    <div className="pt-8">
      <h1 className="rise display-md">Chats</h1>
      <p className="rise mt-1 text-[15px] text-muted-foreground">Private conversations, anonymous until revealed.</p>

      <div className="rise card-soft mt-8 px-6 py-14 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-muted-foreground">
          <MessagesSquare className="size-6" strokeWidth={1.7} />
        </div>
        <p className="mt-5 text-[19px] font-semibold tracking-tight">No conversations yet</p>
        <p className="mx-auto mt-2 max-w-[32ch] text-[15px] text-muted-foreground text-pretty">
          When someone starts a private chat from your link, it shows up here.
        </p>
        <Link
          to="/app/thread/$threadId"
          params={{ threadId: "sample" }}
          className="mt-6 inline-block text-[15px] text-primary"
        >
          See a sample conversation
        </Link>
      </div>

      <div className="rise mt-4">
        <ShareLink username="nandith" />
      </div>
    </div>
  );
}
