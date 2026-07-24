export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans selection:bg-zinc-800">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Financial OS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Mission Control</h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-zinc-400 font-mono">LIFETIME SYSTEM</p>
            <p className="text-sm text-zinc-300 font-medium">Apple Health Minimal Dashboard</p>
          </div>
        </header>

        {/* Dashboard Grid - 4 Minimal Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: 총 자산 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">총 자산</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                +2.4% 전월 대비
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white">
                ₩ 342,800,000
              </div>
              <p className="text-xs text-zinc-400">순자산 (부채 제외 실질 자본)</p>
            </div>
          </div>

          {/* Card 2: FIRE 진행률 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">FIRE 진행률</span>
              <span className="text-sm font-bold text-amber-400">68.5%</span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: '68.5%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>현재: 3.42억 원</span>
                <span>목표: 5.0억 원</span>
              </div>
            </div>
          </div>

          {/* Card 3: 예상 월 자가배당 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-400">예상 월 자가배당</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                연 4% 룰 적용
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold tracking-tight text-white">
                ₩ 1,140,000 <span className="text-sm font-normal text-zinc-400">/ 월</span>
              </div>
              <p className="text-xs text-zinc-400">노동 없이 자본이 창출하는 월 현금흐름</p>
            </div>
          </div>

          {/* Card 4: NISA 진행률 */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">NISA 진행률</span>
              <span className="text-sm font-bold text-indigo-400">82.0%</span>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: '82%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>납입금: 295만 엔</span>
                <span>연간 한도: 360만 엔</span>
              </div>
            </div>
          </div>
        </section>

        {/* Status Footer */}
        <footer className="pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Financial OS Version 0.1 (MVP)</span>
          <span>Apple Health Minimal Theme</span>
        </footer>
      </main>
    </div>
  );
}

