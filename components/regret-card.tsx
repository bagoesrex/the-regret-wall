import { Regret } from "@/types/regret";

interface RegretCardProps {
  regret: Regret;
}

export default function RegretCard({ regret }: RegretCardProps) {
  const { id, canvas, color, createdAt, message, type, views } = regret;

  return (
    <div className="group font-caveat rounded-xs bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.13)]">
      <p className="text-lg">{message}</p>
    </div>
  );
}
