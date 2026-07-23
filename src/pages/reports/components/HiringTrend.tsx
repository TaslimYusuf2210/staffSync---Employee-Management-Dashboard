export function HiringTrend() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">Hiring Reports</h2>
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-sm text-neutral-900 mb-6">Employee Growth Over Time</h3>
        <div className="h-40 relative">
          <svg className="w-full h-32" viewBox="0 0 100 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#171717" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,28 L15,22 L30,24 L45,18 L60,14 L75,10 L100,5 L100,30 L0,30 Z" fill="url(#growthGrad)" />
            <path d="M0,28 L15,22 L30,24 L45,18 L60,14 L75,10 L100,5" fill="none" stroke="#171717" strokeWidth="1.5" />
            <circle cx="0" cy="28" r="2" fill="#171717" />
            <circle cx="15" cy="22" r="2" fill="#171717" />
            <circle cx="30" cy="24" r="2" fill="#171717" />
            <circle cx="45" cy="18" r="2" fill="#171717" />
            <circle cx="60" cy="14" r="2" fill="#171717" />
            <circle cx="75" cy="10" r="2" fill="#171717" />
            <circle cx="100" cy="5" r="2" fill="#171717" />
          </svg>
        </div>
      </div>
    </section>
  );
}
