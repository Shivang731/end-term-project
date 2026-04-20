import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseConfigured } from '../services/firebase.js'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors.js'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Alert } from '../components/ui/alert.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = useMemo(() => location.state?.from?.pathname || '/app', [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (!firebaseConfigured || !auth) {
        throw new Error('Firebase is not configured. Add VITE_FIREBASE_* keys in .env and restart.')
      }
      await signInWithEmailAndPassword(auth, email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(getFirebaseAuthErrorMessage(err, { mode: 'login' }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-xl">
          <CardHeader>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">StudySync</p>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Log in to continue your study plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  minLength={6}
                />
              </div>

              {error && <Alert variant="destructive">{error}</Alert>}

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Logging in…' : 'Login'}
              </Button>

              <p className="text-sm text-slate-400">
                Don’t have an account?{' '}
                <Link className="text-slate-100 underline underline-offset-4 hover:text-white" to="/signup">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

