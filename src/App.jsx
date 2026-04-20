import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTaskContext } from './context/TaskContext.jsx'
import Navbar from './components/Navbar.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCard from './components/TaskCard.jsx'
import { FiBarChart2, FiCheckCircle, FiClock, FiZap } from 'react-icons/fi'

function Dashboard() {
  const { tasks, toggleTaskCompletion, removeTask } = useTaskContext()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const globalStreak = tasks.reduce((max, task) => Math.max(max, task.streak || 0), 0)

  const themeIsDark = theme === 'dark'

  return (
    <main className={`relative min-h-screen overflow-hidden ${themeIsDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl animate-blob"></div>
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-slate-500/20 blur-3xl"></div>
        <div className="absolute left-10 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
      </div>

      <Navbar theme={theme} onToggleTheme={() => setTheme(themeIsDark ? 'light' : 'dark')} />

      <section className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-[32px] border border-white/10 bg-slate-800/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Study momentum</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Built for weekly focus with premium polish.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Progress updates, streak tracking, and polished micro-interactions to keep your study routine intentional.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Daily completion</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-200">
                    <FiBarChart2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold text-white">{completionPercent}%</p>
                    <p className="text-sm text-slate-400">Your study progress</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Streak</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-200">
                    <FiZap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold text-white">{globalStreak}d</p>
                    <p className="text-sm text-slate-400">Longest current streak</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Task pulse</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                    <FiCheckCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold text-white">{completedTasks}/{totalTasks}</p>
                    <p className="text-sm text-slate-400">Completed this session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-950/40 p-4 border border-white/10">
            <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
              <span>Daily completion</span>
              <span>{completionPercent}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-900/70">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TaskForm />

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Total Tasks</p>
                <h2 className="mt-4 text-3xl font-bold text-white">{totalTasks}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Completed</p>
                <h2 className="mt-4 text-3xl font-bold text-white">{completedTasks}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Pending</p>
                <h2 className="mt-4 text-3xl font-bold text-white">{pendingTasks}</h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Task dashboard</p>
                  <h1 className="mt-2 text-2xl font-bold text-white">Daily task overview</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-4 py-2 text-sm text-blue-200">
                  <FiZap className="h-4 w-4" />
                  {completedTasks}/{totalTasks} completed
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={() => toggleTaskCompletion(task.id)}
                    onDelete={() => removeTask(task.id)}
                  />
                ))}
              </div>

              {tasks.length === 0 && (
                <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-slate-950/40 p-10 text-center text-slate-400 backdrop-blur-xl">
                  <p className="text-xl font-semibold text-white">No tasks yet. Start building your study plan 🚀</p>
                  <p className="mt-3 max-w-xl mx-auto text-sm text-slate-400">
                    Use the task builder on the left to map out your day and maintain strong study momentum.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
