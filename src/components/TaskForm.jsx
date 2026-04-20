import { motion } from 'framer-motion'
import { FiPlusCircle, FiLayers } from 'react-icons/fi'
import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext.jsx'

export default function TaskForm() {
  const { addTask, subjects } = useTaskContext()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(subjects[0])
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('Medium')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() || !deadline) {
      return
    }

    addTask({ title: title.trim(), subject, deadline, priority })
    setTitle('')
    setSubject(subjects[0])
    setDeadline('')
    setPriority('Medium')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20">
          <FiLayers className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Add a study task</p>
          <h2 className="mt-2 text-2xl font-bold text-white">New task planner</h2>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-slate-200">Task title</span>
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Finish study guide"
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-slate-200">Subject</span>
          <select
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map((option) => (
              <option key={option} value={option} className="bg-slate-900 text-slate-100">
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-slate-200">Deadline</span>
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-slate-200">Priority</span>
          <select
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-blue-400 focus:ring-blue-400/30"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-400"
        >
          <FiPlusCircle className="h-4 w-4" />
          Add task
        </button>
      </form>
    </motion.section>
  )
}
