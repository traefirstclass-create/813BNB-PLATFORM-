"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { cn } from "../lib/cn";

export interface ChatWidgetProps {
  /** "crisp" | "intercom" | "stub" — keep this pluggable, not hard-coded to one vendor. */
  provider: string;
  widgetId?: string;
  /** Called when a message is sent through the stub panel (no vendor configured yet). */
  onSendMessage: (message: string, contact: { name: string; email: string }) => Promise<void>;
  faq?: { q: string; a: string }[];
}

const defaultFaq = [
  { q: "What are your check-in/check-out times?", a: "Check-in is after 4:00 PM, check-out is by 11:00 AM." },
  { q: "Is Wi-Fi included?", a: "Yes, Wi-Fi is included in every stay." },
];

export function ChatWidget({ provider, widgetId, onSendMessage, faq = defaultFaq }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (provider === "crisp" && widgetId) {
      (window as unknown as { $crisp: unknown[]; CRISP_WEBSITE_ID: string }).$crisp = [];
      (window as unknown as { CRISP_WEBSITE_ID: string }).CRISP_WEBSITE_ID = widgetId;
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
    if (provider === "intercom" && widgetId) {
      const script = document.createElement("script");
      script.innerHTML = `window.intercomSettings={app_id:"${widgetId}"};(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${widgetId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [provider, widgetId]);

  // A real vendor widget renders itself — nothing more to do here.
  if ((provider === "crisp" || provider === "intercom") && widgetId) {
    return null;
  }

  async function handleSubmit() {
    if (!message.trim() || !email.trim()) return;
    await onSendMessage(message, { name, email });
    setSent(true);
    setMessage("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-80 rounded-l border border-charcoal-200 bg-white p-4 shadow-card-lg">
          <p className="text-sm font-semibold text-charcoal-900">Chat with us</p>
          <p className="mt-1 text-xs text-charcoal-500">
            AI-assisted first response — a team member will follow up if we can&apos;t answer here.
          </p>
          <div className="mt-3 space-y-2">
            {faq.map((f) => (
              <details key={f.q} className="rounded-s bg-surface-2 p-2">
                <summary className="cursor-pointer text-xs font-medium text-charcoal-700">{f.q}</summary>
                <p className="mt-1 text-xs text-charcoal-600">{f.a}</p>
              </details>
            ))}
          </div>

          {sent ? (
            <p className="mt-3 text-xs text-teal-700">Thanks — we&apos;ll follow up by email shortly.</p>
          ) : (
            <div className="mt-3 space-y-2">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-s border border-charcoal-300 px-2 py-1.5 text-xs"
              />
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-s border border-charcoal-300 px-2 py-1.5 text-xs"
              />
              <textarea
                placeholder="Ask us anything…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-16 w-full rounded-s border border-charcoal-300 px-2 py-1.5 text-xs"
              />
              <Button size="sm" variant="accent" className="w-full" onClick={handleSubmit}>
                Send
              </Button>
            </div>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-card-lg hover:bg-teal-700",
        )}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
