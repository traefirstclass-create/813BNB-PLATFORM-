import { env } from "./env";

/**
 * SMS notifications via Twilio. Falls back to a console-logged stub when
 * TWILIO_ACCOUNT_SID/AUTH_TOKEN aren't set, so booking/portal flows are
 * exercisable in local dev without live Twilio credentials.
 */
export async function sendSms(to: string, body: string) {
  if (!env.twilio.isConfigured) {
    console.log(`[stub SMS] to=${to} body=${body}`);
    return { isStub: true as const };
  }

  const twilio = (await import("twilio")).default;
  const client = twilio(env.twilio.accountSid, env.twilio.authToken);
  const message = await client.messages.create({
    to,
    from: env.twilio.fromNumber,
    body,
  });
  return { isStub: false as const, sid: message.sid };
}

export async function sendBookingConfirmationSms(phone: string, confirmationCode: string) {
  return sendSms(
    phone,
    `813BNB: Your reservation is confirmed! Confirmation code: ${confirmationCode}. View details in your Client Portal.`,
  );
}
