import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Eye, Send } from "lucide-react";

export const Route = createFileRoute("/app/thread/$threadId")({
  head: () => ({
    meta: [
      { title: "Private chat — Whispr" },
      { name: "description", content: "A private Whispr conversation with identity reveal controls." },
      { property: "og:title", content: "Private chat — Whispr" },
      { property: "og:description", content: "A private Whispr conversation with identity reveal controls." },
    ],
  }),
  component: Thread,
});

type Msg = { id: number; from: "them" | "me"; text: string; time: string };

const sample: Msg[] = [
  { id: 1, from: "them", text: "Hey, I wanted to tell you something...", time: "2:34 PM" },
  { id: 2, from: "them", text: "I think you’re really cool.", time: "2:35 PM" },
  { id: 3, from: "me", text: "Okay now I need to know who this is 👀", time: "2:36 PM" },
];

type Reveal = "idle" | "requested" | "revealed" | "declined";

function Thread() {
  const [messages, setMessages] = useState<Msg[]>(sample);
  const [draft, setDraft] = useState("");
  const [reveal, setReveal] = useState<Reveal>("idle");

  const title = reveal === "revealed" ? "Rahul" : "Anonymous";

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      {
        id: Date.now(),
        from: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col pt-6">
      <div className="glass-bar sticky top-0 z-30 -mx-5 flex items-center gap-3 border-b border-border px-5 pb-3">
        <Link to="/app/chats" className="text-primary">
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex size-9 items-center justify-center rounded-full bg-surface text-[14px] font-medium text-muted-foreground">
          {reveal === "revealed" ? "R" : "?"}
        </div>
        <div className="flex-1">
          <p className="text-[16px] font-semibold tracking-tight">{title}</p>
          <p className="text-[12px] text-muted-foreground">
            {reveal === "revealed" ? "Identity revealed" : "Identity hidden"}
          </p>
        </div>
        {reveal === "idle" && (
          <button
            onClick={() => setReveal("requested")}
            className="pill-ghost inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px]"
          >
            <Eye className="size-4" strokeWidth={1.8} />
            Request identity
          </button>
        )}
      </div>

      <div className="flex-1 space-y-2.5 py-5">
        {messages.map((m) => (
          <div key={m.id} className={m.from === "me" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.from === "me"
                  ? "max-w-[80%] rounded-3xl rounded-br-lg bg-primary px-4 py-2.5 text-[16px] tracking-tight text-primary-foreground"
                  : "max-w-[80%] rounded-3xl rounded-bl-lg bg-background px-4 py-2.5 text-[16px] tracking-tight shadow-[var(--shadow-soft)]"
              }
            >
              {m.text}
              <div className={m.from === "me" ? "mt-0.5 text-[11px] opacity-70" : "mt-0.5 text-[11px] text-muted-foreground"}>
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {reveal === "requested" && (
          <div className="pop card-soft mt-4 p-5 text-center">
            <p className="text-[16px] font-semibold tracking-tight">Nandith wants to know who you are.</p>
            <p className="mt-1 text-[14px] text-muted-foreground">Revealing can’t be undone.</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setReveal("revealed")} className="pill-primary flex-1 py-2.5 text-[15px]">
                Reveal myself
              </button>
              <button onClick={() => setReveal("declined")} className="pill-ghost flex-1 py-2.5 text-[15px]">
                Stay anonymous
              </button>
            </div>
          </div>
        )}

        {reveal === "revealed" && (
          <div className="pop mt-4 flex items-center justify-center gap-2 text-[13px] text-primary">
            <Check className="size-4" strokeWidth={2.2} />
            Identity revealed — you’re chatting with Rahul
          </div>
        )}

        {reveal === "declined" && (
          <div className="pop mt-4 text-center text-[13px] text-muted-foreground">
            The sender chose to remain anonymous.
          </div>
        )}
      </div>

      <div className="glass-bar sticky bottom-20 -mx-5 flex items-end gap-2 px-5 py-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="h-12 flex-1 rounded-full bg-background px-5 text-[16px] tracking-tight shadow-[var(--shadow-soft)] outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="pill-primary flex size-12 shrink-0 items-center justify-center disabled:opacity-40"
        >
          <Send className="size-[18px]" strokeWidth={1.9} />
        </button>
      </div>
    </div>
  );
}
