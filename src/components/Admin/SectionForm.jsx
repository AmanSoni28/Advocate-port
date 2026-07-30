"use client";

import { useState } from "react";
import Field from "./Field";

export default function SectionForm({ initialData, fields, endpoint }) {
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err.error || "Save failed.");
        return;
      }

      const body = await res.json();
      setData(body.data ?? data);
      setMessage("Saved. The live site will reflect this immediately.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Field key={field.key} field={field} data={data} update={setData} />
      ))}

      <div className="mt-4 flex items-center gap-4 border-t border-gray-200 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-[#07172E] transition-colors hover:bg-[#c89b2f] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    </form>
  );
}
