export const env = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN ?? "",
    fromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
    notifyNumber: process.env.LEAD_NOTIFY_PHONE ?? "",
    isConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
  },
  notifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "",
  chat: {
    provider: process.env.NEXT_PUBLIC_CHAT_PROVIDER ?? "stub",
    widgetId: process.env.NEXT_PUBLIC_CHAT_WIDGET_ID ?? "",
  },
  maps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  },
  googlePlaces: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY ?? "",
    placeId: process.env.GOOGLE_PLACES_PLACE_ID ?? "",
  },
};
