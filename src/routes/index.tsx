import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

// Lazy-load pages for code splitting
const ExplorePage = lazy(() => import('@/pages/ExplorePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// Inline fallback — ultra-minimal, won't flash
function PageFallback() {
  return (
    <div className="fixed inset-0 bg-void flex items-center justify-center">
      <div className="w-1 h-1 rounded-full bg-nebula-cyan animate-ping" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <AppLayout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}
