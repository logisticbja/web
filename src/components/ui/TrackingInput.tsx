"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package } from "lucide-react";

export function TrackingInput() {
  const [resi, setResi] = useState("");
  const router = useRouter();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!resi.trim()) return;
    router.push(`/tracking?resi=${encodeURIComponent(resi.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2 w-full max-w-lg"
    >
      <Package size={16} className="text-[#F5C518] shrink-0 ml-2" />
      <input
        type="text"
        value={resi}
        onChange={(e) => setResi(e.target.value)}
        placeholder="Cek resi — contoh: BJA-2024-001"
        className="flex-1 bg-transparent text-white placeholder-white/40 text-sm font-medium outline-none"
      />
      <button
        type="submit"
        disabled={!resi.trim()}
        className="flex items-center gap-1.5 bg-[#F5C518] hover:bg-[#D4A910] disabled:bg-white/20 disabled:cursor-not-allowed text-[#1A1A1A] disabled:text-white/40 font-bold text-xs px-4 py-2 rounded-lg transition-all shrink-0"
      >
        <Search size={13} />
        Cek Status
      </button>
    </form>
  );
}
