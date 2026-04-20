import { motion } from 'framer-motion'
import { FiBookOpen, FiCheckCircle, FiClock, FiTrash2, FiZap } from 'react-icons/fi'

const priorityStyle = {
  Low: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20',
  High: 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20'
}

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const statusClass = task.completed ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-800 text-slate-300'

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300 ring-1 ring-slate-700/80">
          <FiBookOpen className="h-4 w-4 text-sky-300" />
          {task.subject}
        </span>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${priorityStyle[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">{task.title}</h3>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 text-slate-300 ring-1 ring-slate-700/80">
          <FiClock className="h-4 w-4" />
          Deadline: {task.deadline}
        </div>
        <div className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${statusClass}`}> 
          {task.completed ? <FiCheckCircle className="h-4 w-4" /> : <FiClock className="h-4 w-4" />}
          {task.completed ? 'Completed' : 'Pending'}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/80 px-3 py-2 ring-1 ring-slate-700/80">
          <FiZap className="h-4 w-4 text-amber-300" />
          {task.streak} day streak
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onToggleComplete}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40"
        >
          <FiCheckCircle className="h-4 w-4" />
          {task.completed ? 'Mark Pending' : 'Complete'}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-rose-200 transition duration-200 hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-500/10"
        >
          <FiTrash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </motion.article>
  )
}
