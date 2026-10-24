import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBudgetInput, normalizeProjectBudget } from "../src/lib/project-budget";

test("budget input groups thousands while preserving decimal editing", () => {
  for (const [input, expected] of [
    ["10", "10"],
    ["100", "100"],
    ["1000", "1,000"],
    ["10000", "10,000"],
    ["1000000", "1,000,000"],
    ["12345.6", "12,345.6"],
    ["12345.", "12,345."],
    [".5", "0.5"],
    ["000123", "123"],
  ])
    assert.equal(formatBudgetInput(input), expected);
  assert.equal(formatBudgetInput("1,234.5", true), "1,234.50");
  assert.equal(formatBudgetInput("1,234.", true), "1,234");
  assert.equal(formatBudgetInput(""), "");
});

test("budget normalization preserves currency and exact decimal digits without conversion", () => {
  assert.deepEqual(normalizeProjectBudget("10,000", "PKR"), { success: true, value: "PKR 10,000" });
  assert.deepEqual(normalizeProjectBudget("10000.5", "USD"), {
    success: true,
    value: "USD 10,000.50",
  });
  assert.deepEqual(normalizeProjectBudget("999999999999999.99", "PKR"), {
    success: true,
    value: "PKR 999,999,999,999,999.99",
  });
  assert.deepEqual(normalizeProjectBudget("0", "USD"), { success: true, value: "USD 0" });
});

test("budget remains optional but supplied amounts and currencies are validated", () => {
  for (const value of [undefined, null, "", "  "])
    assert.deepEqual(normalizeProjectBudget(value, undefined), { success: true, value: undefined });
  for (const amount of [
    "-100",
    "1e3",
    "Infinity",
    "12,34",
    "1.234",
    ".",
    "10 USD",
    "1000000000000000",
    100,
    {},
    "<script>",
  ])
    assert.equal(normalizeProjectBudget(amount, "PKR").success, false);
  for (const currency of [undefined, "EUR", "usd", "<script>"])
    assert.equal(normalizeProjectBudget("100", currency).success, false);
  for (const amount of ["-10", "1e3", "1.234", "PKR 100", "1000000000000000"])
    assert.equal(formatBudgetInput(amount), null);
});
