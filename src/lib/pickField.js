// Mirrors LanguageContext's t() fallback behavior: prefer the requested
// language, fall back to English if the Hindi value is missing/blank.
export function pick(obj, field, lang) {
  if (!obj) return "";
  const value = obj[`${field}_${lang}`];
  if (value !== undefined && value !== null && value !== "") return value;
  return obj[`${field}_en`] ?? "";
}
