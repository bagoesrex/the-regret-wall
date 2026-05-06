"use client";

import { useState } from "react";
import RegretCard from "./regret-card";
import { generateRotate } from "@/lib/regret";
import { Plus } from "lucide-react";
import CreateRegret from "./create-regret";
import { useRegrets } from "@/hooks/use-regrets";
import { Regret } from "@/actions/regrets";

export default function Wall() {
  const { data } = useRegrets();
  const [open, setOpen] = useState(false);

  const regrets =
    data?.data?.map((r: Regret) => ({
      ...r,
      rotate: generateRotate(),
    })) ?? [];

  return (
    <div className="relative">
      <div className="columns-1 gap-8 space-y-8 sm:columns-2 md:columns-3 lg:columns-5">
        {regrets.map((regret) => (
          <div key={regret.id} className="break-inside-avoid">
            <RegretCard regret={regret} />
          </div>
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white shadow-xl"
      >
        <Plus />
      </button>

      {open && (
        <CreateRegret
          onClose={() => setOpen(false)}
          onSubmitted={() => {
            return;
          }}
        />
      )}
    </div>
  );
}
