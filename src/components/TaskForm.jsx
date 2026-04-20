import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext.jsx'
import { Button } from './ui/button.jsx'
import { Input } from './ui/input.jsx'
import { Label } from './ui/label.jsx'
import { Alert } from './ui/alert.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx'

export default function TaskForm() {
  const { addTask, subjects } = useTaskContext()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(subjects[0])
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    if (!title.trim() || !deadline) {
      setFormError('Please add a title and a deadline.')
      return
    }

    setSubmitting(true)
    try {
      await addTask({ title: title.trim(), subject, deadline, priority })
      setTitle('')
      setSubject(subjects[0])
      setDeadline('')
      setPriority('Medium')
    } catch (err) {
      setFormError(err?.message || 'Failed to save task.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Task builder</p>
          <CardTitle className="text-xl">Add a study task</CardTitle>
          <CardDescription>Create tasks with a subject, deadline, and priority.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="task-title">Task title</Label>
              <Input
                id="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Review calculus formulas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-subject">Subject</Label>
              <select
                id="task-subject"
                className="flex h-10 w-full rounded-md border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((option) => (
                  <option key={option} value={option} className="bg-slate-950 text-slate-100">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-deadline">Deadline</Label>
              <Input id="task-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <select
                id="task-priority"
                className="flex h-10 w-full rounded-md border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Saving…' : 'Add task'}
            </Button>

            {formError && <Alert variant="destructive">{formError}</Alert>}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
