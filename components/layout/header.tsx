import Link from "next/link";

export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between border-b border-black/10 bg-[var(--background)]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link
          href="/"
          aria-label="The Regret Wall home"
          className="group inline-flex flex-col leading-none"
        >
          <span className="font-caveat text-2xl text-black/85 transition-colors group-hover:text-[#c4947a] sm:text-3xl">
            The Regret Wall
          </span>
          <span className="mt-1 text-[0.65rem] tracking-[0.14em] text-black/45 uppercase">
            a place for things left unsaid
          </span>
        </Link>

        <div className="hidden items-center gap-2 text-right sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c4947a]" aria-hidden="true" />
          <span className="max-w-32 text-xs leading-relaxed text-black/40">
            Leave something you wish, you did differently.
          </span>
        </div>
      </div>
    </header>
  );
}
