import { useEffect } from 'react'
import { useCyraStore } from '@/store'

export function useReducedMotion(): boolean {
  const { reducedMotion, setReducedMotion } = useCyraStore()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [setReducedMotion])

  return reducedMotion
}
