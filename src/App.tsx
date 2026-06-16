import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from '@/routes'
import { LandingOverlay } from './LandingOverlay'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Landing page rendered above everything until dismissed */}
        <LandingOverlay />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
