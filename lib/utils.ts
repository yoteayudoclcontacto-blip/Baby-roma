import type { Money } from "./shopify/types";

export function formatMoney(money: Money, locale = "es-CL"): string {
  const amount = Number(money.amount);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: money.currencyCode === "CLP" ? 0 : 2,
    maximumFractionDigits: money.currencyCode === "CLP" ? 0 : 2,
  }).format(amount);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
