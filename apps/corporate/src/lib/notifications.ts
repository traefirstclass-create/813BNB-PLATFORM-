import { env } from "./env";

/**
 * Notifies Rasheen when a new lead comes in. SMS goes through Twilio (falls
 * back to a console-logged stub without live credentials). Email is a
 * logged stub only — wire up a transactional email provider (Resend,
 * SendGrid, Postmark) and replace this function's body when one is chosen;
 * until then this is NOT sending real email despite the function name.
 */
export async function notifyNewLead(summary: string) {
  if (env.twilio.isConfigured && env.twilio.notifyNumber) {
    const twilio = (await import("twilio")).default;
    const client = twilio(env.twilio.accountSid, env.twilio.authToken);
    await client.messages.create({ to: env.twilio.notifyNumber, from: env.twilio.fromNumber, body: summary });
  } else {
    console.log(`[stub SMS to owner] ${summary}`);
  }

  if (env.notifyEmail) {
    console.log(`[stub email to ${env.notifyEmail}] ${summary}`);
  }
}
