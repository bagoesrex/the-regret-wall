"use client";

import { Regret } from "@/types/regret";
import { useEffect, useState } from "react";

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
    <div className="grid grid-cols-4 gap-5">
      {regrets.map((regret) => (
        <div key={regret.id}>
          <h1>{regret.message}</h1>
        </div>
      ))}
    </div>
  );
}
