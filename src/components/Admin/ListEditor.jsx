"use client";

import Field from "./Field";

export default function ListEditor({ label, items, itemFields, onChange }) {
  function updateItem(index, newItem) {
    const next = [...items];
    next[index] = newItem;
    onChange(next);
  }

  function addItem() {
    onChange([...items, {}]);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function moveItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const next = [...items];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  }

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#07172E]">{label}</h3>
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg border border-[#D4AF37] px-3 py-1.5 text-xs font-semibold text-[#07172E] hover:bg-[#D4AF37]/10"
        >
          + Add item
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item._id || index} className="rounded-xl border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>

            {itemFields.map((f) => (
              <Field
                key={f.key}
                field={f}
                data={item}
                update={(newItem) => updateItem(index, newItem)}
              />
            ))}
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-gray-400">No items yet — click &quot;Add item&quot; to create one.</p>
        )}
      </div>
    </div>
  );
}
