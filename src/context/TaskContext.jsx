import { createContext, useContext, useEffect, useState } from 'react'

const TaskContext = createContext(null)

const initialTasks = [
  {
    id: 1,
    title: 'Review calculus formulas',
    subject: 'Math',
    deadline: '2026-05-01',
    priority: 'High',
    completed: false,
    streak: 2
  },
  {
    id: 2,
    title: 'Draft literature essay',
    subject: 'Literature',
    deadline: '2026-05-03',
    priority: 'Medium',
    completed: true,
    streak: 4
  },
  {
    id: 3,
    title: 'Practice chemistry reactions',
    subject: 'Science',
    deadline: '2026-04-25',
    priority: 'Low',
    completed: false,
    streak: 1
  }
]

const subjects = ['Math', 'Science', 'Literature', 'Coding', 'Language', 'Design']

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('study-sync-tasks')
      return stored ? JSON.parse(stored) : initialTasks
    }
    return initialTasks
  })

  useEffect(() => {
    window.localStorage.setItem('study-sync-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        ...task,
        completed: false,
        streak: 0
      },
      ...prev
    ])
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        const newCompleted = !task.completed
        return {
          ...task,
          completed: newCompleted,
          streak: newCompleted ? task.streak + 1 : task.streak
        }
      })
    )
  }

  const removeTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        subjects,
        addTask,
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
 