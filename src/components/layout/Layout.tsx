import { useEffect, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
