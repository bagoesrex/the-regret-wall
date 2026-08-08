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
  const { data, isError, isFetching, isLoading, refetch } = useRegrets();

  const [open, setOpen] = useState(false);

  const regrets =
    data?.data?.map((r: Regret) => ({
      ...r,
      rotate: generateRotate(),
    })) ?? [];

  return (
    <div className="relative">
      {isLoading ? (
        <div
          aria-busy="true"
          aria-label="Loading regrets"
          className="columns-2 gap-4 space-y-8 md:columns-3 md:gap-8 lg:columns-5"
        >
          {["h-44", "h-56", "h-48", "h-64", "h-52", "h-44", "h-60", "h-50", "h-56", "h-48"].map(
            (h, idx) => (
              <div key={`sk-${idx}`} className="break-inside-avoid">
                <WallSkeletonCard heightClass={h} />
              </div>
            ),
          )}
        </div>
      ) : isError ? (
        <div
          role="alert"
          className="flex min-h-80 items-center justify-center px-4 py-12 text-center"
        >
          <div className="w-full max-w-md -rotate-1 overflow-hidden rounded-sm bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
            <div className="h-1.5 bg-[#c4947a]" />
            <div className="p-6 sm:p-8">
              <p className="font-caveat text-3xl text-black/80">the wall is taking a break</p>
              <p className="mt-2 text-sm leading-relaxed text-black/50">
                We couldn&apos;t bring the regrets in right now. Give it another try.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="font-caveat mt-6 rounded-sm bg-[#c4947a] px-5 py-2 text-lg text-white transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-50"
              >
                {isFetching ? "trying again..." : "try again"}
              </button>
            </div>
          </div>
        </div>
      ) : regrets.length === 0 ? (
        <div
          role="status"
          className="flex min-h-80 items-center justify-center px-4 py-12 text-center"
        >
          <div className="w-full max-w-md rotate-1 overflow-hidden rounded-sm bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
            <div className="h-1.5 bg-[#7aa0c4]" />
            <div className="p-6 sm:p-8">
              <p className="font-caveat text-3xl text-black/80">the wall is quiet</p>
              <p className="mt-2 text-sm leading-relaxed text-black/50">
                Nothing has been pinned here yet. Leave the first one.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="font-caveat mt-6 rounded-sm bg-[#7aa0c4] px-5 py-2 text-lg text-white transition-opacity hover:opacity-80"
              >
                leave a regret
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="columns-2 gap-4 space-y-8 sm:gap-6 md:columns-3 md:gap-8 lg:columns-5">
          {regrets.map((regret) => (
            <div key={regret.id} className="break-inside-avoid">
              <RegretCard regret={regret} />
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        aria-label="Leave a regret"
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white shadow-xl"
      >
        <Plus aria-hidden="true" />
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
