export default function Header() {
  return (
    <header className="fixed z-50 w-full px-2">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-b-xl border border-gray-200 bg-white px-5 py-2.5 pb-4.5">
        <div className="space-x-2">
          <span className="relative text-xl font-medium italic">
            TheRegretWall
            <span className="absolute top-4 left-0 min-w-60 text-xs text-gray-500 sm:left-20">
              Leave something you wish, you did differently
            </span>
          </span>
        </div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}
