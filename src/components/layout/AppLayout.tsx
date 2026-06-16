import { useEffect } from 'react'
import { TopBar } from './TopBar'
import { MobileMenu } from './MobileMenu'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useKeyboard } from '@/hooks/useKeyboard'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  // Activate global hooks
  useReducedMotion()
  useKeyboard()

  // Prevent context menu on canvas (right-click orbit controls)
  useEffect(() => {
    const prevent = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'CANVAS') e.preventDefault()
    }
    window.addEventListener('contextmenu', prevent)
    return () => window.removeEventListener('contextmenu', prevent)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-void">
      <TopBar />
      <MobileMenu />
      <main className="w-full h-full" role="main">
        {children}
      </main>
    </div>
  )
}
