import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft } from "lucide-react";
import { registerUser } from "../lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Get started — Whispr" },
      {
        name: "description",
        content: "Pick your username and get your Whispr link in seconds.",
      },
      { property: "og:title", content: "Get started — Whispr" },
      {
        property: "og:description",
        content: "Pick your username and get your Whispr link in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});

const PLATFORMS = [
  {
    id: "instagram",
    label: "Instagram",
    dot: "bg-[linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)]",
  },
  {
    id: "snapchat",
    label: "Snapchat",
    dot: "bg-[#fffc00]",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    dot: "bg-[#25d366]",
  },
  {
    id: "x",
    label: "X",
    dot: "bg-foreground",
  },
];

function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState<0 | 1>(0);
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const valid = /^[a-z0-9_.]{3,24}$/.test(username);

  const submit = async () => {
    if (!valid || loading) return;

    try {
      setLoading(true);
      setError("");

      const data = await registerUser(username);

      localStorage.setItem(
        "whispr_session_token",
        data.session_token,
      );

      setStep(1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pt-6 pb-10">
        <div className="flex h-10 items-center">
          {step === 1 && (
            <button
              onClick={() => setStep(0)}
              aria-label="Back"
              className="-ml-2 p-2 text-primary"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          <div className="ml-auto flex gap-1.5">
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === step
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 0 ? (
          <div key="u" className="pop flex flex-1 flex-col">
            <h1 className="display-md mt-16 text-center text-balance">
              Choose a username
            </h1>

            <p className="mt-2 text-center text-[15px] text-muted-foreground">
              This becomes your Whispr link.
            </p>

            <div className="card-soft mt-10 flex items-center px-5 py-4">
              <span className="text-[19px] tracking-tight text-muted-foreground">
                @
              </span>

              <input
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s/g, ""),
                  );
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && valid) {
                    submit();
                  }
                }}
                placeholder="yourname"
                maxLength={24}
                className="ml-0.5 flex-1 bg-transparent text-[19px] tracking-tight outline-none placeholder:text-muted-foreground/60"
              />

              {valid && (
                <Check
                  className="size-5 text-primary"
                  strokeWidth={2.2}
                />
              )}
            </div>

            <p className="mt-3 text-center text-[13px] text-muted-foreground">
              whispr.app/@{username || "yourname"}
            </p>

            {error && (
              <p className="mt-3 text-center text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              disabled={!valid || loading}
              onClick={submit}
              className="pill-primary mt-auto w-full py-4 text-[17px] disabled:opacity-40"
            >
              {loading ? "Checking username..." : "Continue"}
            </button>
          </div>
        ) : (
          <div key="p" className="pop flex flex-1 flex-col">
            <h1 className="display-md mt-16 text-center text-balance">
              Where will you share Whispr?
            </h1>

            <p className="mt-2 text-center text-[15px] text-muted-foreground">
              We’ll tailor your share link.
            </p>

            <div className="mt-10 space-y-3">
              {PLATFORMS.map((p) => {
                const active = platform === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`card-soft flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-300 ${
                      active ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <span
                      className={`size-8 rounded-[10px] ${p.dot}`}
                    />

                    <span className="flex-1 text-[17px] font-medium tracking-tight">
                      {p.label}
                    </span>

                    <span
                      className={`flex size-6 items-center justify-center rounded-full border transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {active && (
                        <Check
                          className="size-3.5"
                          strokeWidth={3}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              disabled={!platform}
              onClick={() => navigate({ to: "/app" })}
              className="pill-primary mt-auto w-full py-4 text-[17px] disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}