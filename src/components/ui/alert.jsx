import { cn } from '../../lib/utils.js'

export function Alert({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'border-white/10 bg-slate-950/30 text-slate-100',
    destructive: 'border-rose-500/20 bg-rose-500/10 text-rose-100'
  }

  return <div role="alert" className={cn('rounded-lg border px-4 py-3 text-sm', variants[variant], className)} {...props} />
}

