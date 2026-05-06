"use client";

import { useState } from "react";
import RegretCard from "./regret-card";
import { generateRotate } from "@/lib/regret";
import { Plus } from "lucide-react";
import CreateRegret from "./create-regret";
import { useRegrets } from "@/hooks/use-regrets";
import { Regret } from "@/actions/regrets";

function WallSkeletonCard({ heightClass }: { heightClass: string }) {
  return (
    <div
      className={`font-caveat relative overflow-hidden rounded-sm bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5 ${heightClass}`}
    >
      <div className="h-1.5 w-full bg-black/5" />
      <div className="p-4">
        <div className="mb-3 h-3 w-24 rounded bg-black/5" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-black/5" />
          <div className="h-4 w-11/12 rounded bg-black/5" />
          <div className="h-4 w-10/12 rounded bg-black/5" />
          <div className="h-4 w-9/12 rounded bg-black/5" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-black/5 to-transparent" />
    </div>
  );
}

export default function Wall() {
  const { data, isLoading, isFetching, isError } = useRegrets();
  const [open, setOpen] = useState(false);

  const regrets =
    data?.data?.map((r: Regret) => ({
      ...r,
      rotate: generateRotate(),
    })) ?? [];

  return (
    <div className="relative">
      <div className="columns-2 gap-4 space-y-8 sm:gap-6 md:columns-3 md:gap-8 lg:columns-5">
        {isLoading
          ? ["h-44", "h-56", "h-48", "h-64", "h-52", "h-44", "h-60", "h-50", "h-56", "h-48"].map(
              (h, idx) => (
                <div key={`sk-${idx}`} className="break-inside-avoid">
                  <WallSkeletonCard heightClass={h} />
                </div>
              ),
            )
          : regrets.map((regret) => (
              <div key={regret.id} className="break-inside-avoid">
                <RegretCard regret={regret} />
              </div>
            ))}
      </div>

      {isError ? (
        <div className="mt-10 text-center text-sm text-black/50">
          Failed to load regrets. Please refresh.
        </div>
      ) : null}

      {isFetching && !isLoading ? (
        <div className="pointer-events-none fixed top-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs text-black/50 shadow-sm backdrop-blur">
          Updating…
        </div>
      ) : null}

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
