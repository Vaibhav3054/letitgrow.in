export function BackgroundShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-float-slow absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#4facfe]/15 blur-3xl dark:bg-[#4facfe]/10" />
      <div className="animate-float-delayed absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[#00f2fe]/15 blur-3xl dark:bg-[#00f2fe]/10" />
      <div className="animate-float-slow absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/5" />
    </div>
  )
}
