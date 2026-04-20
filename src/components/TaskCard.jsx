import { motion } from 'framer-motion'
import { FiBookOpen, FiCheckCircle, FiClock, FiTrash2, FiZap } from 'react-icons/fi'
import { Button } from './ui/button.jsx'
import { Card, CardContent } from './ui/card.jsx'

const priorityStyle = {
  Low: 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/20',
  High: 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/20'
}

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const statusClass = task.completed
    ? 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-500/20'
    : 'bg-slate-950/40 text-slate-200 ring-1 ring-white/10'

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/40 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-white/10">
              <FiBookOpen className="h-4 w-4 text-slate-300" />
              {task.subject}
            </span>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${priorityStyle[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          <h3 className="mt-4 text-base font-semibold text-white leading-snug">{task.title}</h3>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-950/40 px-3 py-2 text-slate-200 ring-1 ring-white/10">
              <FiClock className="h-4 w-4 text-slate-300" />
              <span className="text-slate-300">Due</span>
              <span className="text-slate-100">{task.deadline}</span>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${statusClass}`}>
              {task.completed ? <FiCheckCircle className="h-4 w-4" /> : <FiClock className="h-4 w-4" />}
              {task.completed ? 'Completed' : 'Pending'}
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-slate-950/40 px-3 py-2 text-sm text-slate-200 ring-1 ring-white/10">
            <FiZap className="h-4 w-4 text-slate-300" />
            <span className="text-slate-300">Streak</span>
            <span className="text-slate-100">{task.streak} days</span>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" onClick={onToggleComplete}>
              <FiCheckCircle className="h-4 w-4" />
              {task.completed ? 'Mark pending' : 'Complete'}
            </Button>
            <Button type="button" variant="destructive" onClick={onDelete}>
              <FiTrash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
