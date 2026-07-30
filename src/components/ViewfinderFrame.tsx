export function ViewfinderFrame() {
  return (
    <>
      {/* Corner brackets */}
      <div className="pointer-events-none fixed inset-4 md:inset-6 z-40">
        <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/40" />
      </div>
      {/* Red light leak edges */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 w-[3px] z-30 opacity-70"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--brand-red) 30%, var(--brand-red) 70%, transparent)",
          boxShadow: "0 0 60px 8px var(--brand-red)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-y-0 right-0 w-[3px] z-30 opacity-70"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--brand-red) 30%, var(--brand-red) 70%, transparent)",
          boxShadow: "0 0 60px 8px var(--brand-red)",
        }}
      />
      {/* Grain + grunge texture */}
      <div className="grunge-overlay" />
      <div className="grain-overlay" />
    </>
  );
}
