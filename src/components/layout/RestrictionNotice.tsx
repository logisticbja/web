export function RestrictionNotice() {
  const text = "🚫 TIDAK MENERIMA PENGIRIMAN HEWAN HIDUP & FROZEN FOOD 🚫";

  return (
    <div className="bg-[#F5C518] overflow-hidden py-2">
      <div className="marquee-track">
        <span className="marquee-item">{text}</span>
        <span className="marquee-item">{text}</span>
        <span className="marquee-item">{text}</span>
        <span className="marquee-item">{text}</span>
        <span className="marquee-item" aria-hidden="true">{text}</span>
        <span className="marquee-item" aria-hidden="true">{text}</span>
        <span className="marquee-item" aria-hidden="true">{text}</span>
        <span className="marquee-item" aria-hidden="true">{text}</span>
      </div>
      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding-right: 3rem;
          color: #CC1F2A;
          font-weight: 900;
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .marquee-item {
            font-size: 1rem;
          }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
