"use client";

export default function PlainTextField({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#07172E]">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
      />
    </div>
  );
}
