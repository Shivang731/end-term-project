import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { firebaseConfigured, firebaseMissingKeys } from './services/firebase.js'

const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Planner = lazy(() => import('./pages/Planner.jsx'))
const Insights = lazy(() => import('./pages/Insights.jsx'))

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  if (!firebaseConfigured) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <section className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/70 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Setup required</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Firebase environment variables are missing</h1>
          <p className="mt-3 text-sm text-slate-400">
            Create a <code className="rounded bg-slate-950/60 px-2 py-1">.env</code> file (see <code className="rounded bg-slate-950/60 px-2 py-1">.env.example</code>) and set your
            <code className="rounded bg-slate-950/60 px-2 py-1 ml-1">VITE_FIREBASE_*</code> keys, then restart the dev server.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Missing keys</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-slate-200">
              {firebaseMissingKeys.map((k) => (
                <li key={k} className="rounded-2xl border border-white/10 bg-slate-900/40 px-3 py-2">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Loading</p>
            <p className="mt-3 text-xl font-semibold text-white">Preparing app…</p>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            </div>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </Suspense>
  )
}
