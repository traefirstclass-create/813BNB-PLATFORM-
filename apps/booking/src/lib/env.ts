/**
 * Central place to read integration env vars. Every third-party integration
 * (Stripe, Twilio, DocuSign/HelloSign, chat) is optional at runtime: if the
 * key is missing we fall back to a sandbox/stub mode so local dev and
 * preview deploys work without live credentials. Set real keys per Vercel
 * project when going live.
 */
export const env = {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? "",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
    isConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN ?? "",
    fromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
    isConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
  },
  esignature: {
    provider: process.env.ESIGNATURE_PROVIDER ?? "docusign",
    apiKey: process.env.ESIGNATURE_API_KEY ?? "",
    isConfigured: Boolean(process.env.ESIGNATURE_API_KEY),
  },
  chat: {
    provider: process.env.NEXT_PUBLIC_CHAT_PROVIDER ?? "stub",
    widgetId: process.env.NEXT_PUBLIC_CHAT_WIDGET_ID ?? "",
  },
  maps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    isConfigured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
  },
};
