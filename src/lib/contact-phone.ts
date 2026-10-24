// Accept local/international formatting and an optional extension, without assuming a country.
export function isGeneralPhoneNumber(value: string): boolean {
  const phone = value.trim();
  if (!phone) return true;
  const match = /^(\+?[\d\s().-]+?)(?:\s*(?:ext\.?|x|#)\s*(\d{1,8}))?$/i.exec(phone);
  if (!match) return false;
  const digits = match[1].replace(/\D/g, "").replace(/^00/, "");
  return digits.length >= 7 && digits.length <= 15;
}
