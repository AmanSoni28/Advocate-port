"use client";

import BilingualField from "./fields/BilingualField";
import PlainTextField from "./fields/PlainTextField";
import ImageUploadField from "./fields/ImageUploadField";
import IconPickerField from "./fields/IconPickerField";
import FixedListField from "./fields/FixedListField";
import ListEditor from "./ListEditor";

// Recursive field renderer. `data` is the object this field's key lives on,
// `update` replaces that whole object (parent merges it back up one level).
export default function Field({ field, data, update }) {
  const value = data[field.key];

  switch (field.type) {
    case "text":
    case "textarea":
      return (
        <BilingualField
          label={field.label}
          multiline={field.type === "textarea"}
          valueEn={data[`${field.key}_en`] || ""}
          valueHi={data[`${field.key}_hi`] || ""}
          onChangeEn={(v) => update({ ...data, [`${field.key}_en`]: v })}
          onChangeHi={(v) => update({ ...data, [`${field.key}_hi`]: v })}
        />
      );

    case "textareaPlain":
      return (
        <PlainTextField
          label={field.label}
          multiline
          value={value}
          onChange={(v) => update({ ...data, [field.key]: v })}
        />
      );

    case "plainText":
      return (
        <PlainTextField
          label={field.label}
          value={value}
          onChange={(v) => update({ ...data, [field.key]: v })}
        />
      );

    case "number":
      return (
        <PlainTextField
          label={field.label}
          type="number"
          value={value}
          onChange={(v) => update({ ...data, [field.key]: v })}
        />
      );

    case "image":
      return (
        <ImageUploadField
          label={field.label}
          value={value}
          onChange={(id) => update({ ...data, [field.key]: id })}
        />
      );

    case "icon":
      return (
        <IconPickerField
          label={field.label}
          value={value}
          onChange={(v) => update({ ...data, [field.key]: v })}
        />
      );

    case "fixedList":
      return (
        <FixedListField
          label={field.label}
          values={value}
          count={field.count}
          itemLabels={field.itemLabels}
          onChange={(vals) => update({ ...data, [field.key]: vals })}
        />
      );

    case "group": {
      const groupData = value || {};
      const groupUpdate = (newGroupData) => update({ ...data, [field.key]: newGroupData });
      return (
        <fieldset className="mb-6 rounded-xl border border-gray-200 p-4">
          <legend className="px-1 text-sm font-semibold text-[#07172E]">{field.label}</legend>
          {field.fields.map((f) => (
            <Field key={f.key} field={f} data={groupData} update={groupUpdate} />
          ))}
        </fieldset>
      );
    }

    case "list":
      return (
        <ListEditor
          label={field.label}
          items={value || []}
          itemFields={field.itemFields}
          onChange={(items) => update({ ...data, [field.key]: items })}
        />
      );

    default:
      return null;
  }
}
