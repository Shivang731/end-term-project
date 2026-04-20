import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiLayers, FiZap } from 'react-icons/fi'
import { useTaskContext } from '../context/TaskContext.jsx'
import Navbar from '../components/Navbar.jsx'

function formatDate(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function clampInt(value, { min, max, fallback }) {
  const n = Number.parseInt(value, 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

export default function Planner({ theme, onToggleTheme }) {
  const { subjects, addTasksBulk } = useTaskContext()

  const todayStr = useMemo(() => formatDate(new Date()), [])

  const [subject, setSubject] = useState(subjects[0])
  const [startDate, setStartDate] = useState(todayStr)
  const [examDate, setExamDate] = useState('')
  const [topicsCount, setTopicsCount] = useState('12')
  const [sessionsPerWeek, setSessionsPerWeek] = useState('4')
  const [difficulty, setDifficulty] = useState('Medium')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const generatePlan = () => {
    const topics = clampInt(topicsCount, { min: 1, max: 80, fallback: 12 })
    const spw = clampInt(sessionsPerWeek, { min: 1, max: 14, fallback: 4 })

    const start = new Date(`${startDate}T00:00:00`)
    const exam = new Date(`${examDate}T00:00:00`)
    if (!examDate || Number.isNaN(exam.getTime())) {
      throw new Error('Please choose a valid exam date.')
    }
    if (exam <= start) {
      throw new Error('Exam date must be after the start date.')
    }

    const msPerDay = 24 * 60 * 60 * 1000
    const days = Math.ceil((exam.getTime() - start.getTime()) / msPerDay)
    const weeks = Math.max(1, Math.ceil(days / 7))
    const totalSessions = weeks * spw

    const priorityMap = { Low: 'Low', Medium: 'Medium', High: 'High' }
    const priority = priorityMap[difficulty] || 'Medium'

    const tasks = []
    for (let i = 0; i < totalSessions; i += 1) {
      const topicIndex = (i % topics) + 1
      const dayOffset = Math.floor((i / totalSessions) * (days - 1))
      const deadlineDate = new Date(start.getTime() + dayOffset * msPerDay)
      tasks.push({
        title: `Topic ${topicIndex}: ${subject} study session`,
        subject,
        deadline: formatDate(deadlineDate),
        priority
      })
    }

    // Final revision sprint
    tasks.push({
      title: `Final revision: ${subject} (mock + recap)`,
      subject,
      deadline: formatDate(new Date(exam.getTime() - msPerDay)),
      priority: 'High'
    })

    return tasks
  }

  const onCreatePlan = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)
    try {
      const tasks = generatePlan()
      await addTasksBulk(tasks)
      setMessage(`Created ${tasks.length} sessions in your dashboard.`)
    } catch (err) {
      setError(err?.message || 'Failed to generate plan.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <section className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-white/10 bg-slate-900/70 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Smart plan generator</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Build a realistic schedule</h1>
              <p className="mt-2 text-sm text-slate-400">
                Turn an exam date + weekly availability into a set of study sessions saved to your account.
              </p>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20">
              <FiZap className="h-5 w-5" />
            </div>
          </div>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onCreatePlan}>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Subject</span>
              <select
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-slate-100">
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Plan starts</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 ring-1 ring-transparent focus-within:border-blue-400 focus-within:ring-blue-400/30">
                <FiCalendar className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-slate-100 outline-none"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Exam date</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 ring-1 ring-transparent focus-within:border-blue-400 focus-within:ring-blue-400/30">
                <FiCalendar className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-slate-100 outline-none"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Weekly sessions</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 ring-1 ring-transparent focus-within:border-blue-400 focus-within:ring-blue-400/30">
                <FiLayers className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-slate-100 outline-none"
                  type="number"
                  value={sessionsPerWeek}
                  onChange={(e) => setSessionsPerWeek(e.target.value)}
                  min={1}
                  max={14}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">Tip: 4–6 sessions/week is sustainable for most students.</p>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Number of topics</span>
              <input
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
                type="number"
                value={topicsCount}
                onChange={(e) => setTopicsCount(e.target.value)}
                min={1}
                max={80}
              />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-slate-200">Difficulty</span>
              <select
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Low">Light</option>
                <option value="Medium">Normal</option>
                <option value="High">Intense</option>
              </select>
            </label>

            <div className="sm:col-span-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiZap className="h-4 w-4" />
                {submitting ? 'Generating…' : 'Generate plan & save'}
              </button>

              {error && (
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  )
}

