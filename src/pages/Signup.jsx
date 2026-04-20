import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseConfigured } from '../services/firebase.js'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors.js'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Alert } from '../components/ui/alert.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      if (!firebaseConfigured || !auth) {
        throw new Error('Firebase is not configured. Add VITE_FIREBASE_* keys in .env and restart.')
      }
      await createUserWithEmailAndPassword(auth, email.trim(), password)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(getFirebaseAuthErrorMessage(err, { mode: 'signup' }))
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
            <CardTitle>Create account</CardTitle>
            <CardDescription>Start building a study plan that actually adapts.</CardDescription>
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
                  placeholder="Min 6 characters"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              {error && <Alert variant="destructive">{error}</Alert>}

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Creating…' : 'Sign up'}
              </Button>

              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <Link className="text-slate-100 underline underline-offset-4 hover:text-white" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

