"use client";

import { Regret } from "@/types/regret";
import { useEffect, useState } from "react";
import RegretCard from "./regret-card";

export default function Wall() {
  const [regrets, setRegrets] = useState<Regret[]>([]);

  useEffect(() => {
    fetch("/api/regrets")
      .then((r) => r.json())
      .then((data) => {
        setRegrets(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-8">
      {regrets.map((regret) => (
        <RegretCard key={regret.id} regret={regret} />
      ))}
    </div>
  );
}
