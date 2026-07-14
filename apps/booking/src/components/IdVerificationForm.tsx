"use client";

import { useState } from "react";
import { Button, Input } from "@813bnb/ui";

export function IdVerificationForm({ currentStatus }: { currentStatus: string | null }) {
  const [documentUrl, setDocumentUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (currentStatus === "VERIFIED" || done) {
    return <p className="text-sm text-teal-700">ID verification submitted — our team will confirm shortly.</p>;
  }

  async function handleSubmit() {
    setSubmitting(true);
    await fetch("/api/id-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentUrl }),
    });
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input
          label="ID document URL"
          hint="Upload your ID to any file host and paste the link — a direct file upload pipeline can be added when a storage provider (e.g. S3/Vercel Blob) is connected."
          value={documentUrl}
          onChange={(e) => setDocumentUrl(e.target.value)}
          placeholder="https://…"
        />
      </div>
      <Button onClick={handleSubmit} disabled={!documentUrl || submitting} variant="primary">
        {submitting ? "Submitting…" : "Submit for review"}
      </Button>
    </div>
  );
}
