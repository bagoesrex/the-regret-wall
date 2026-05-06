import { useCreateRegret } from "@/hooks/use-regrets";
import { useState } from "react";

const COLORS = ["#c4947a", "#7aa0c4", "#a07ac4", "#8fb87a", "#c4a07a", "#7ac4ba"];

interface CreateRegretProps {
  onClose: () => void;
  onSubmitted: () => void;
}

export default function CreateRegret({ onClose, onSubmitted }: CreateRegretProps) {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [submitting, setSubmitting] = useState(false);

  const createRegret = useCreateRegret();

  async function handleSubmit() {
    if (!message.trim() || submitting) return;
    setSubmitting(true);

    try {
      await createRegret.mutateAsync({
        type: "text",
        canvas: null,
        message,
        color,
      });

      onSubmitted();
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="font-caveat relative flex w-full max-w-md rotate-3 flex-col gap-4 rounded-sm bg-white p-6 shadow-xl">
        <h2 className="text-2xl" style={{ color }}>
          leave your regret
        </h2>

        <div className="flex items-center gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
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

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="something you wish you did differently..."
          maxLength={300}
          rows={5}
          autoFocus
          className="w-full resize-none bg-transparent text-lg leading-relaxed outline-none"
          style={{ color }}
        />

        <div className="flex items-center justify-between">
          <span className="text-sm opacity-30">{message.length}/300</span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm opacity-30 transition-opacity hover:opacity-60"
            >
              cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || submitting}
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
