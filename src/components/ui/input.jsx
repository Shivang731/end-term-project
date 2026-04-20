import { cn } from '../../lib/utils.js'

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 ' +
          'placeholder:text-slate-500 ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        className
      )}
      {...props}
    />
  )
}

