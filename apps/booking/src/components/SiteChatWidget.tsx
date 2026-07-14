"use client";

import { ChatWidget } from "@813bnb/ui";
import { env } from "@/lib/env";

export function SiteChatWidget() {
  return (
    <ChatWidget
      provider={env.chat.provider}
      widgetId={env.chat.widgetId}
      onSendMessage={async (message, contact) => {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contact.name || "Chat visitor",
            email: contact.email,
            phone: "Not provided",
            message,
            sourcePage: "/chat-widget",
          }),
        });
      }}
    />
  );
}
