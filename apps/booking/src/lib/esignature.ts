import { env } from "./env";

/**
 * E-signature integration point for rental agreements (DocuSign or
 * HelloSign/Dropbox Sign). Without ESIGNATURE_API_KEY set, this stubs an
 * envelope so the Client Portal sign flow is fully exercisable in dev.
 * Swap the body of sendForSignature with a real DocuSign/HelloSign API call
 * once ESIGNATURE_PROVIDER and ESIGNATURE_API_KEY are set.
 */
export async function sendForSignature(bookingId: string) {
  if (!env.esignature.isConfigured) {
    return { envelopeId: `stub_envelope_${bookingId}`, isStub: true as const };
  }

  throw new Error(
    `ESIGNATURE_PROVIDER=${env.esignature.provider} is configured but no live API call is implemented yet — add the provider SDK call here.`,
  );
}
