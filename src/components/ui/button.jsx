import { cn } from '../../lib/utils.js'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ' +
  'disabled:pointer-events-none disabled:opacity-60'

const variants = {
  default: 'bg-slate-100 text-slate-950 hover:bg-slate-100/90',
  secondary: 'bg-slate-900 text-slate-100 border border-white/10 hover:bg-slate-900/70',
  outline: 'border border-white/10 bg-transparent hover:bg-white/5 text-slate-100',
  destructive: 'bg-rose-500 text-white hover:bg-rose-500/90'
}

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-11 px-6',
  icon: 'h-10 w-10'
}

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}

