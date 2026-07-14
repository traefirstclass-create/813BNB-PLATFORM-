"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Textarea } from "@813bnb/ui";

export function MaintenanceRequestForm({ propertyId, unitId }: { propertyId: string; unitId: string }) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!description.trim()) return;
    setSubmitting(true);
    await fetch("/api/maintenance-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, unitId, description }),
    });
    setSubmitting(false);
    setDescription("");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Textarea
          label="New maintenance request"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue…"
        />
      </div>
      <Button onClick={handleSubmit} disabled={submitting || !description.trim()} variant="secondary">
        {submitting ? "Submitting…" : "Submit request"}
      </Button>
    </div>
  );
}
