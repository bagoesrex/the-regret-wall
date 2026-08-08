"use client";

import { useCreateRegret } from "@/hooks/use-regrets";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Canvas as FabricCanvas } from "fabric";
import { toast } from "sonner";

const COLORS = ["#c4947a", "#7aa0c4", "#a07ac4", "#8fb87a", "#c4a07a", "#7ac4ba"];
const COLOR_LABELS = ["terracotta", "blue", "purple", "green", "tan", "teal"];

interface CreateRegretProps {
  onClose: () => void;
  onSubmitted: () => void;
}

export default function CreateRegret({ onClose, onSubmitted }: CreateRegretProps) {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasObjectCount, setCanvasObjectCount] = useState(0);
  const [hasEverOpenedCanvas, setHasEverOpenedCanvas] = useState(false);
  const colorRef = useRef(color);

  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);

  const createRegret = useCreateRegret();

  const hasCanvasContent = canvasObjectCount > 0;

  async function handleSubmit() {
    if (submitting) return;

    const trimmed = message.trim();
    const hasText = trimmed.length > 0;
    const hasCanvas = canvasObjectCount > 0 && !!fabricRef.current;

    if (!hasText && !hasCanvas) return;
    setSubmitting(true);

    try {
      let canvasPayload: object | null = null;
      if (hasCanvas) {
        const f = fabricRef.current!;
        canvasPayload = {
          format: "fabric.js",
          fabricVersion: 7,
          width: f.getWidth(),
          height: f.getHeight(),
          json: f.toJSON(),
          pngDataUrl: f.toDataURL({ format: "png", multiplier: 2 }),
        };
      }

      const res = await createRegret.mutateAsync({
        canvas: canvasPayload,
        message: hasText ? trimmed : null,
        color,
      });

      if (!res?.success) {
        toast.error(res?.message ?? "Failed to create regret", {
          style: { borderColor: "rgba(239, 68, 68, 0.35)" },
        });
        return;
      }

      toast.success("Regret added", {
        style: { borderColor: "rgba(34, 197, 94, 0.35)" },
      });
      onSubmitted();
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.", {
        style: { borderColor: "rgba(239, 68, 68, 0.35)" },
      });
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = useMemo(() => {
    if (submitting) return false;
    if (message.trim()) return true;
    return canvasObjectCount > 0;
  }, [canvasObjectCount, message, submitting]);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    if (!showCanvas) return;
    if (!canvasElRef.current || !canvasWrapRef.current) return;
    if (fabricRef.current) return;

    let disposed = false;
    let ro: ResizeObserver | null = null;

    (async () => {
      const mod = await import("fabric");
      if (disposed) return;

      const f = new mod.Canvas(canvasElRef.current!, {
        backgroundColor: "#ffffff",
        preserveObjectStacking: true,
      });

      f.isDrawingMode = true;
      f.freeDrawingBrush = new mod.PencilBrush(f);
      f.freeDrawingBrush.width = 6;
      (f.freeDrawingBrush as unknown as { color: string }).color = colorRef.current;

      const wrap = canvasWrapRef.current!;
      const resize = () => {
        const w = Math.max(1, Math.floor(wrap.clientWidth));
        const h = Math.max(1, Math.floor(wrap.clientHeight));
        f.setDimensions({ width: w, height: h });
        f.requestRenderAll();
      };

      ro = new ResizeObserver(resize);
      ro.observe(wrap);
      resize();

      const updateCount = () => setCanvasObjectCount(f.getObjects().length);
      f.on("path:created", updateCount);
      f.on("object:added", updateCount);
      f.on("object:removed", updateCount);
      updateCount();

      fabricRef.current = f;
    })();

    return () => {
      disposed = true;
      ro?.disconnect();
      ro = null;
    };
  }, [showCanvas]);

  useEffect(() => {
    const f = fabricRef.current;
    if (!f || !f.freeDrawingBrush) return;
    (f.freeDrawingBrush as unknown as { color: string }).color = color;
  }, [color]);

  useEffect(() => {
    return () => {
      fabricRef.current?.dispose();
      fabricRef.current = null;
    };
  }, []);

  function handleClearCanvas() {
    const f = fabricRef.current;
    if (!f) return;
    f.getObjects().forEach((o) => f.remove(o));
    f.requestRenderAll();
    setCanvasObjectCount(0);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 sm:items-center sm:px-0">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (!submitting) onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-regret-title"
        aria-busy={submitting}
        className="font-caveat relative my-auto flex w-full max-w-md rotate-2 flex-col gap-4 overflow-y-auto rounded-sm bg-white p-4 shadow-xl sm:p-6"
        style={{ maxHeight: "calc(100dvh - 2rem)" }}
      >
        <h2 id="create-regret-title" className="text-2xl" style={{ color }}>
          leave your regret
        </h2>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setShowCanvas((v) => {
                const next = !v;
                if (next) setHasEverOpenedCanvas(true);
                return next;
              });
            }}
            className="text-sm opacity-30 transition-opacity hover:opacity-60"
          >
            {showCanvas ? "hide drawing" : "add drawing"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {COLORS.map((c, index) => (
            <button
              key={c}
              type="button"
              aria-label={`Choose ${COLOR_LABELS[index]} color`}
              aria-pressed={color === c}
              onClick={() => setColor(c)}
              className="h-5 w-5 rounded-full transition-transform hover:scale-110"
              style={{
                background: c,
                outline: color === c ? `2px solid ${c}` : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>

        {hasEverOpenedCanvas ? (
          <div className={`flex flex-col gap-2 ${showCanvas ? "" : "hidden"}`}>
            <div
              ref={canvasWrapRef}
              className="h-44 w-full overflow-hidden rounded-sm border border-black/10 sm:h-56"
            >
              <canvas ref={canvasElRef} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-30">
                {hasCanvasContent ? "looks good" : "draw something..."}
              </span>
              <button
                type="button"
                onClick={handleClearCanvas}
                className="opacity-30 transition-opacity hover:opacity-60"
              >
                clear
              </button>
            </div>
          </div>
        ) : null}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="something you wish you did differently..."
          maxLength={120}
          rows={4}
          autoFocus
          className="w-full resize-none bg-transparent text-lg leading-relaxed outline-none"
          style={{ color }}
        />

        <div className="flex items-center justify-between">
          <span className="text-sm opacity-30">{message.length}/120</span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-1.5 text-sm opacity-30 transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-20"
            >
              cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="rounded-sm px-5 py-1.5 text-sm transition-opacity disabled:opacity-30"
              style={{ background: color, color: "#fff" }}
            >
              {submitting ? "leaving..." : "leave it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
