"use client";

export default function FixedListField({ label, values, count, itemLabels, onChange }) {
  const arr =
    values && values.length === count
      ? values
      : Array.from({ length: count }, (_, i) => values?.[i] ?? "");

  function updateAt(index, val) {
    const next = [...arr];
    next[index] = val;
    onChange(next);
  }

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#07172E]">{label}</label>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {arr.map((value, index) => (
          <div key={index}>
            <span className="text-xs uppercase tracking-wide text-gray-400">
              {itemLabels[index]}
            </span>
            <input
              value={value ?? ""}
              onChange={(e) => updateAt(index, e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
