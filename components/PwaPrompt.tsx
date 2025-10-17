"use client";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isBeforeInstallPromptEvent(e: Event): e is BeforeInstallPromptEvent {
  const candidate = e as unknown as { prompt?: unknown };
  return typeof candidate.prompt === "function";
}

export default function PwaPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      // Chrome fires 'beforeinstallprompt' (non-standard)
      if (!isBeforeInstallPromptEvent(e)) return;
      e.preventDefault(); // hold the prompt
      setDeferred(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall as EventListener);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall as EventListener);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl border bg-background/90 backdrop-blur p-3 shadow">
      <div className="flex items-center gap-3">
        <span>🌸 Install “Renz — Portfolio”?</span>

        <button
          className="px-3 py-1 rounded-md border hover:bg-accent/40 text-sm"
          onClick={async () => {
            try {
              await deferred?.prompt();
            } finally {
              setShow(false);
              setDeferred(null);
            }
          }}
        >
          Install
        </button>

        <button
          className="px-3 py-1 rounded-md text-sm hover:opacity-70"
          onClick={() => setShow(false)}
        >
          Later
        </button>
      </div>
    </div>
  );
}
