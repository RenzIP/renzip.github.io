"use client";
import { useEffect, useState } from "react";

export default function PwaPrompt() {
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl border bg-background/90 backdrop-blur p-3 shadow">
      <div className="flex items-center gap-3">
        <span>🌸 Install “Renz — Portfolio”?</span>
        <button
          className="px-3 py-1 rounded-md border hover:bg-accent/40 text-sm"
          onClick={async () => {
            await deferred?.prompt();
            setShow(false);
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
