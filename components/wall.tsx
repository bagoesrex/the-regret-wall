"use client";

import { Regret } from "@/types/regret";
import { useEffect, useState } from "react";
import RegretCard from "./regret-card";
import { generateRotate } from "@/lib/utils";

export default function Wall() {
  const [regrets, setRegrets] = useState<Regret[]>([]);

  useEffect(() => {
    fetch("/api/regrets")
      .then((r) => r.json())
      .then((data) => {
        setRegrets(data.map((r: Regret) => ({ ...r, rotate: generateRotate() })));
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
