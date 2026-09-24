import { useState } from "react";
import { Check, Copy, Share } from "lucide-react";

export function ShareLink({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);
  const link = `whispr.app/@${username}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${link}`);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "My Whispr", url: `https://${link}` });
        return;
      } catch {
        /* dismissed */
      }
    }
    void copy();
  };

  return (
    <div className="card-soft p-5">
      <p className="text-[13px] font-medium tracking-tight text-muted-foreground">Your Whispr link</p>
      <p className="mt-1 truncate text-[19px] font-semibold tracking-tight">{link}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={copy} className="pill-ghost flex flex-1 items-center justify-center gap-2 py-2.5 text-[15px]">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <button onClick={share} className="pill-primary flex flex-1 items-center justify-center gap-2 py-2.5 text-[15px]">
          <Share className="size-4" />
          Share
        </button>
      </div>
    </div>
  );
}
