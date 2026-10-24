// Accept local/international formatting and an optional extension, without assuming a country.
export function isGeneralPhoneNumber(value: string): boolean {
  // Bound work before trimming or matching user-controlled input.
  if (value.length > 128) return false;
  const phone = value.trim();
  if (!phone) return true;

  // Split at the first extension marker so number/extension whitespace cannot backtrack
  // between overlapping repetitions. Both anchored checks have disjoint token classes.
  const extensionStart = phone.search(/[ex#]/i);
  const number = extensionStart === -1 ? phone : phone.slice(0, extensionStart);
  if (extensionStart !== -1 && !/^(?:ext\.?|x|#)\s*\d{1,8}$/i.test(phone.slice(extensionStart)))
    return false;
  if (!/^\+?[\d\s().-]+$/.test(number)) return false;
  const digits = number.replace(/\D/g, "").replace(/^00/, "");
  return digits.length >= 7 && digits.length <= 15;
}
