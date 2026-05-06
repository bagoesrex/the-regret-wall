import { Regret } from "@/actions/regrets";

interface RegretCardProps {
  regret: Regret;
}

export default function RegretCard({ regret }: RegretCardProps) {
  const { id, canvas, color, createdAt, message, type, views, rotate } = regret;

  return (
    <div
      className="group font-caveat rounded-xs bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.13)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <p className="text-lg">{message}</p>
    </div>
  );
}
