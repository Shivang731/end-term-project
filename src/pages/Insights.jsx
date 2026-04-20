import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiCalendar, FiPieChart, FiTrendingUp } from 'react-icons/fi'
import { useTaskContext } from '../context/TaskContext.jsx'
import Navbar from '../components/Navbar.jsx'

function isOverdue(task, todayStr) {
  return !task.completed && task.deadline && task.deadline < todayStr
}

export default function Insights({ theme, onToggleTheme }) {
  const { tasks } = useTaskContext()

  const todayStr = useMemo(() => {
    const d = new Date()
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])

  const data = useMemo(() => {
    const overdue = tasks.filter((t) => isOverdue(t, todayStr))
    const upcoming = tasks
      .filter((t) => !t.completed && t.deadline && t.deadline >= todayStr)
      .sort((a, b) => (a.deadline < b.deadline ? -1 : 1))
      .slice(0, 6)

    const byPriority = tasks.reduce(
      (acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1
        return acc
      },
      { Low: 0, Medium: 0, High: 0 }
    )

    const completionRate = tasks.length ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0

    return { overdue, upcoming, byPriority, completionRate }
  }, [tasks, todayStr])

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-white/10 bg-slate-900/70 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Insights</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">See what needs attention</h1>
              <p className="mt-2 text-sm text-slate-400">Quick signals that help you adjust your plan before it slips.</p>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950/60 text-slate-200 ring-1 ring-white/10">
              <FiTrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Completion rate</p>
              <p className="mt-3 text-3xl font-bold text-white">{data.completionRate}%</p>
              <p className="mt-1 text-sm text-slate-400">Across all tasks</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Overdue</p>
              <p className="mt-3 text-3xl font-bold text-white">{data.overdue.length}</p>
              <p className="mt-1 text-sm text-slate-400">Needs rescheduling</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Priority mix</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                <FiPieChart className="h-4 w-4 text-slate-400" />
                <span>High {data.byPriority.High} • Med {data.byPriority.Medium} • Low {data.byPriority.Low}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
              <div className="flex items-center gap-2 text-slate-200">
                <FiAlertTriangle className="h-4 w-4 text-amber-300" />
                <h2 className="text-lg font-semibold text-white">Overdue tasks</h2>
              </div>
              <div className="mt-4 space-y-3">
                {data.overdue.slice(0, 6).map((t) => (
                  <div key={t.id} className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3">
                    <p className="font-semibold text-white">{t.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {t.subject} • Deadline {t.deadline} • {t.priority}
                    </p>
                  </div>
                ))}
                {data.overdue.length === 0 && <p className="text-sm text-slate-400">No overdue tasks. Keep going.</p>}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
              <div className="flex items-center gap-2 text-slate-200">
                <FiCalendar className="h-4 w-4 text-cyan-300" />
                <h2 className="text-lg font-semibold text-white">Upcoming deadlines</h2>
              </div>
              <div className="mt-4 space-y-3">
                {data.upcoming.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3">
                    <p className="font-semibold text-white">{t.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {t.subject} • Due {t.deadline} • {t.priority}
                    </p>
                  </div>
                ))}
                {data.upcoming.length === 0 && <p className="text-sm text-slate-400">No upcoming tasks yet.</p>}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

