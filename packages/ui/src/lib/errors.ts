interface ZodFlattenedError {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
}

/**
 * Pulls the first human-readable message out of a zod .flatten() error
 * response. Field-specific errors (e.g. an invalid email) land in
 * fieldErrors, not formErrors — a naive `error?.formErrors?.[0] ?? error`
 * fallback resolves to the whole error object in that case, which crashes
 * React when rendered directly as text ("Objects are not valid as a React
 * child"). Always returns a string.
 */
export function extractApiErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (typeof error !== "object") return fallback;

  const e = error as ZodFlattenedError;
  if (e.fieldErrors) {
    for (const messages of Object.values(e.fieldErrors)) {
      if (messages && messages.length > 0) return messages[0]!;
    }
  }
  if (e.formErrors && e.formErrors.length > 0) return e.formErrors[0]!;

  return fallback;
}
