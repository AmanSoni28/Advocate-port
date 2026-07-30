"use client";

import { useState } from "react";

export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Upload failed");
        return;
      }

      const data = await res.json();
      onChange(data.id);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#07172E]">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/images/${value}`}
            alt=""
            className="h-20 w-32 rounded-lg border border-gray-200 object-cover"
          />
        )}
        <div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            disabled={uploading}
            className="text-sm"
          />
          {uploading && <p className="mt-1 text-xs text-gray-500">Uploading...</p>}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
