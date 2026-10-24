export type BudgetCurrency = "PKR" | "USD";

// Keep decimal digits as strings so grouping never rounds a monetary amount.
export function formatBudgetInput(value: string, finalize = false): string | null {
  if (value.length > 24) return null;
  const raw = value.replaceAll(",", "");
  if (!/^\d*(?:\.\d{0,2})?$/.test(raw)) return null;
  if (!raw) return "";
  const [whole, fraction] = raw.split(".");
  const integer = (whole || "0").replace(/^0+(?=\d)/, "");
  if (integer.length > 15) return null;
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (fraction === undefined || (finalize && !fraction)) return grouped;
  return grouped + "." + (finalize ? fraction.padEnd(2, "0") : fraction);
}

type BudgetResult =
  { success: true; value: string | undefined } | { success: false; error: string };
export function normalizeProjectBudget(amount: unknown, currency: unknown): BudgetResult {
  if (amount === undefined || amount === null || (typeof amount === "string" && !amount.trim()))
    return { success: true, value: undefined };
  if (currency !== "PKR" && currency !== "USD")
    return { success: false, error: "Choose PKR or USD for your project budget." };
  if (
    typeof amount !== "string" ||
    !/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{0,2})?$/.test(amount.trim())
  )
    return { success: false, error: "Enter a valid project budget with up to two decimal places." };
  const formatted = formatBudgetInput(amount.trim(), true);
  if (formatted === null)
    return {
      success: false,
      error: "Enter a project budget with at most 15 whole-number digits and two decimal places.",
    };
  return { success: true, value: currency + " " + formatted };
}
