export function getFirebaseAuthErrorMessage(err, { mode } = { mode: 'login' }) {
  const code = err?.code || ''

  if (code === 'auth/configuration-not-found') {
    return 'Firebase Auth is not enabled for this project. In Firebase Console → Authentication → Get started → Sign-in method, enable Email/Password, then restart the dev server.'
  }

  if (code === 'auth/invalid-api-key') {
    return 'Firebase API key is invalid. Double-check your .env values.'
  }

  if (mode === 'signup') {
    if (code === 'auth/email-already-in-use') return 'This email is already in use. Try logging in instead.'
    if (code === 'auth/weak-password') return 'Password is too weak. Use at least 6 characters.'
  }

  if (mode === 'login') {
    if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
      return 'No account found for this email/password. Try signing up.'
    }
    if (code === 'auth/wrong-password') return 'Incorrect password. Try again.'
  }

  return err?.message || (mode === 'signup' ? 'Signup failed. Please try again.' : 'Login failed. Please try again.')
}

