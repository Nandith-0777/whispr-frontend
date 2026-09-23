import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, MessageCircle, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/u/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} on Whispr` },
      { name: "description", content: `Send @${params.username} an anonymous message or start a private chat.` },
      { property: "og:title", content: `@${params.username} on Whispr` },
      {
        property: "og:description",
        content: `Send @${params.username} an anonymous message or start a private chat.`,
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicProfile,
});

type Mode = "choose" | "ask" | "sent" | "chat";

type GuestMessage = { id: number; from: "me" | "them"; text: string; time: string };

function PublicProfile() {
  const { username } = Route.useParams();
  const name = username.charAt(0).toUpperCase() + username.slice(1);
  const [mode, setMode] = useState<Mode>("choose");
  const [draft, setDraft] = useState("");
  const [chatDraft, setChatDraft] = useState("");
  const [thread, setThread] = useState<GuestMessage[]>([]);

  const sendChat = () => {
    const text = chatDraft.trim();
    if (!text) return;
    setThread((t) => [
      ...t,
      {
        id: Date.now(),
        from: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      },
    ]);
    setChatDraft("");
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-5 pt-6 pb-10">
        <div className="flex items-center justify-between">
          {mode === "choose" ? (
            <Link to="/" className="text-[15px] tracking-tight text-muted-foreground">
              Whispr
            </Link>
          ) : (
            <button
              onClick={() => setMode("choose")}
              className="inline-flex items-center gap-1 text-[15px] text-primary"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          )}
          <span className="text-[13px] text-muted-foreground">whispr.app/@{username}</span>
        </div>

        <div className="pop mt-8 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-background text-[26px] font-semibold tracking-tight shadow-[var(--shadow-soft)]">
            {name.charAt(0)}
          </div>
          <h1 className="mt-4 text-[26px] font-semibold tracking-tight">{name}</h1>
          <p className="text-[15px] text-muted-foreground">@{username}</p>
          <p className="mx-auto mt-3 max-w-[28ch] text-[17px] tracking-tight text-pretty">Ask me anything 👀</p>
        </div>

        {mode === "choose" && (
          <div className="pop mt-10 space-y-3">
            <button
              onClick={() => setMode("ask")}
              className="pill-primary flex w-full items-center justify-center gap-2 py-4 text-[17px]"
            >
              <Sparkles className="size-[18px]" strokeWidth={1.8} />
              Ask anonymously
            </button>
            <button
              onClick={() => setMode("chat")}
              className="pill-ghost flex w-full items-center justify-center gap-2 bg-background py-4 text-[17px]"
            >
              <MessageCircle className="size-[18px]" strokeWidth={1.8} />
              Start private chat
            </button>
            <p className="pt-2 text-center text-[13px] text-muted-foreground text-pretty">
              No account needed. {name} won’t see who you are.
            </p>
          </div>
        )}

        {mode === "ask" && (
          <div className="pop mt-10">
            <div className="card-soft p-4">
              <textarea
                autoFocus
                value={draft}
                maxLength={300}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Ask ${name} anything...`}
                className="h-40 w-full resize-none bg-transparent text-[17px] leading-relaxed tracking-tight outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-[12px] text-muted-foreground">{draft.length}/300</span>
                <span className="text-[12px] text-muted-foreground">Sent anonymously</span>
              </div>
            </div>
            <button
              disabled={!draft.trim()}
              onClick={() => setMode("sent")}
              className="pill-primary mt-4 w-full py-4 text-[17px] disabled:opacity-40"
            >
              Send anonymously
            </button>
          </div>
        )}

        {mode === "sent" && (
          <div className="pop mt-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-7" strokeWidth={2.2} />
            </div>
            <p className="mt-5 text-[22px] font-semibold tracking-tight">Message sent anonymously</p>
            <p className="mx-auto mt-2 max-w-[32ch] text-[15px] text-muted-foreground text-pretty">
              {name} will never know it came from you.
            </p>
            <button
              onClick={() => {
                setDraft("");
                setMode("choose");
              }}
              className="pill-ghost mt-8 bg-background px-6 py-3 text-[15px]"
            >
              Send another
            </button>
          </div>
        )}

        {mode === "chat" && (
          <div className="pop mt-8 flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-2.5 overflow-y-auto pb-4">
              {thread.length === 0 ? (
                <p className="mx-auto max-w-[30ch] pt-10 text-center text-[15px] text-muted-foreground text-pretty">
                  Say hi. You’ll appear as <span className="text-foreground">Anonymous</span> until you choose
                  otherwise.
                </p>
              ) : (
                thread.map((m) => (
                  <div key={m.id} className="pop flex justify-end">
                    <div className="max-w-[80%] rounded-3xl rounded-br-lg bg-primary px-4 py-2.5 text-[16px] tracking-tight text-primary-foreground">
                      {m.text}
                      <div className="mt-0.5 text-[11px] opacity-70">{m.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="sticky bottom-0 flex items-end gap-2 pt-2">
              <input
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Type a message..."
                className="h-12 flex-1 rounded-full bg-background px-5 text-[16px] tracking-tight shadow-[var(--shadow-soft)] outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={sendChat}
                disabled={!chatDraft.trim()}
                className="pill-primary flex size-12 shrink-0 items-center justify-center disabled:opacity-40"
              >
                <Send className="size-[18px]" strokeWidth={1.9} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
