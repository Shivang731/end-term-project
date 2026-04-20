export function cn(...inputs) {
  return inputs
    .flatMap((i) => {
      if (!i) return []
      if (typeof i === 'string') return [i]
      if (Array.isArray(i)) return i.filter(Boolean)
      if (typeof i === 'object') return Object.entries(i).filter(([, v]) => Boolean(v)).map(([k]) => k)
      return []
    })
    .join(' ')
}

