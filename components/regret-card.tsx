import { Regret } from "@/actions/regrets";
import Image from "next/image";

interface RegretCardProps {
  regret: Regret;
}

function getPngDataUrl(canvas: unknown): string | null {
  if (!canvas || typeof canvas !== "object") return null;
  const maybe = (canvas as { pngDataUrl?: unknown }).pngDataUrl;
  return typeof maybe === "string" && maybe.startsWith("data:image/") ? maybe : null;
}

function formatDate(input: unknown): string | null {
  if (typeof input !== "string" || !input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

export default function RegretCard({ regret }: RegretCardProps) {
  const { canvas, color, createdAt, message, rotate, views } = regret;
  const pngDataUrl = getPngDataUrl(canvas);
  const dateLabel = formatDate(createdAt);

  return (
    <div
      className="group font-caveat relative h-fit overflow-hidden rounded-sm bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: color ?? "#ccc" }} />

      <div className="relative px-4 pb-4 pt-4">
        <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="h-3 w-3 rounded-full bg-red-700 shadow-[0_6px_14px_rgba(0,0,0,0.18)] ring-2 ring-white/70" />
        </div>

        {pngDataUrl ? (
          <div className="mb-3 overflow-hidden rounded-md border border-black/10 bg-white">
            <Image
              src={pngDataUrl}
              alt=""
              width={900}
              height={600}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <div className="mb-2 flex items-center justify-between text-xs text-black/40">
          <span>{dateLabel ?? ""}</span>
          <span>{typeof views === "number" ? `${views} views` : ""}</span>
        </div>

        {message ? (
          <p
            className="text-lg leading-relaxed text-black/90"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {message}
          </p>
        ) : (
          <p className="text-sm text-black/40"> </p>
        )}
      </div>
    </div>
  );
}
