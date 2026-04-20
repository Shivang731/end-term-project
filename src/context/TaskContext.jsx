import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore'
import { db, firebaseConfigured } from '../services/firebase.js'
import { useAuth } from './AuthContext.jsx'

const TaskContext = createContext(null)

const subjects = ['Math', 'Science', 'Literature', 'Coding', 'Language', 'Design']

export function TaskProvider({ children }) {
  const { user } = useAuth()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tasksCollection = useMemo(() => {
    if (!user?.uid) return null
    if (!firebaseConfigured || !db) return null
    return collection(db, 'users', user.uid, 'tasks')
  }, [user?.uid])

  useEffect(() => {
    setError('')

    if (!tasksCollection) {
      setTasks([])
      setLoading(false)
      return
    }

    setLoading(true)
    const q = query(tasksCollection, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const next = snap.docs.map((d) => {
          const data = d.data()
          return {
            id: d.id,
            title: data.title || '',
            subject: data.subject || subjects[0],
            deadline: data.deadline || '',
            priority: data.priority || 'Medium',
            completed: Boolean(data.completed),
            streak: Number.isFinite(data.streak) ? data.streak : 0
          }
        })
        setTasks(next)
        setLoading(false)
      },
      (err) => {
        setError(err?.message || 'Failed to load tasks from database.')
        setLoading(false)
      }
    )

    return unsubscribe
  }, [tasksCollection])

  const addTask = useCallback(
    async (task) => {
      if (!tasksCollection) return
      setError('')
      await addDoc(tasksCollection, {
        title: task.title,
        subject: task.subject,
        deadline: task.deadline,
        priority: task.priority,
        completed: false,
        streak: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    },
    [tasksCollection]
  )

  const addTasksBulk = useCallback(
    async (newTasks) => {
      if (!user?.uid) return
      if (!Array.isArray(newTasks) || newTasks.length === 0) return
      setError('')

      const batch = writeBatch(db)
      for (const task of newTasks) {
        const ref = doc(collection(db, 'users', user.uid, 'tasks'))
        batch.set(ref, {
          title: task.title,
          subject: task.subject,
          deadline: task.deadline,
          priority: task.priority,
          completed: false,
          streak: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }
      await batch.commit()
    },
    [user?.uid]
  )

  const toggleTaskCompletion = useCallback(
    async (taskId) => {
      if (!user?.uid) return
      setError('')
      const current = tasks.find((t) => t.id === taskId)
      if (!current) return

      const newCompleted = !current.completed
      const nextStreak = newCompleted ? (current.streak || 0) + 1 : current.streak || 0

      await updateDoc(doc(db, 'users', user.uid, 'tasks', taskId), {
        completed: newCompleted,
        streak: nextStreak,
        updatedAt: serverTimestamp()
      })
    },
    [tasks, user?.uid]
  )

  const removeTask = useCallback(
    async (taskId) => {
      if (!user?.uid) return
      setError('')
      await deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId))
    },
    [user?.uid]
  )

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        subjects,
        addTask,
        addTasksBulk,
        toggleTaskCompletion,
        removeTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
 