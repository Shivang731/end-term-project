import { FiMoon, FiSun, FiZap } from 'react-icons/fi'

export default function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 px-4 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">StudySync</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300 bg-clip-text">
            Smart Study Planner
          </h1>
          <p className="mt-2 text-sm text-slate-400">Plan smarter. Study better.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 transition hover:border-blue-400 hover:bg-slate-900/90"
          >
            {isDark ? <FiSun className="h-4 w-4 text-amber-300" /> : <FiMoon className="h-4 w-4 text-slate-200" />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>

          <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-3 shadow-xl shadow-slate-950/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/10">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-300">Focus mode</p>
              <p className="text-xs text-slate-500">Premium planner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
