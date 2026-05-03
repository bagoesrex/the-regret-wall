import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed z-50 w-full p-2">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3.5">
        <div>
          <span className="text-xl font-medium italic">TheRegretWall</span>
        </div>
        <div></div>
        <div>
          <Settings className="text-black/70" />
        </div>
      </div>
    </header>
  );
}
