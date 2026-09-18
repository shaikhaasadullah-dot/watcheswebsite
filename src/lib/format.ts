export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(date),
  );
}

export const SHIPPING_METHODS = [
  { id: "standard", label: "Standard", eta: "4–6 business days", price: 0 },
  { id: "express", label: "Express", eta: "1–2 business days", price: 1900 },
  { id: "courier", label: "White-glove courier", eta: "Next day, signature required", price: 4500 },
] as const;

export const FREE_SHIPPING_THRESHOLD = 20000;
export const TAX_RATE = 0.08;

export function styleLabel(style: string) {
  return { dress: "Dress", sport: "Sport & Dive", minimal: "Minimalist", smart: "Smart" }[style] ?? style;
}

export function genderLabel(gender: string) {
  return { men: "Men", women: "Women", unisex: "Unisex" }[gender] ?? gender;
}
