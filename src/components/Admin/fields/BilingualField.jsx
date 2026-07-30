"use client";

export default function BilingualField({ label, multiline, valueEn, valueHi, onChangeEn, onChangeHi }) {
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#07172E]">{label}</label>
      <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-400">English</span>
          <Tag
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            rows={multiline ? 3 : undefined}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-400">Hindi</span>
          <Tag
            value={valueHi}
            onChange={(e) => onChangeHi(e.target.value)}
            rows={multiline ? 3 : undefined}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
