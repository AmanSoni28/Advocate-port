"use client";

import { iconMap } from "@/lib/iconMap";

const iconNames = Object.keys(iconMap);

export default function IconPickerField({ label, value, onChange }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#07172E]">{label}</label>
      <select
        value={value || iconNames[0]}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
      >
        {iconNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
