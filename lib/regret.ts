export function generateRotate() {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * (1 + Math.random() * 2);
}

export function getRegretPngDataUrl(canvas: unknown): string | null {
  if (!canvas || typeof canvas !== "object") return null;
  const maybe = (canvas as { pngDataUrl?: unknown }).pngDataUrl;
  return typeof maybe === "string" && maybe.startsWith("data:image/") ? maybe : null;
}

export function formatRegretDate(input: unknown): string | null {
  if (typeof input !== "string" || !input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}
