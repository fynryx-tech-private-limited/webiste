import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold text-primary-200">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button to="/" variant="secondary" className="mt-8">
        Back to Home
      </Button>
    </section>
  )
}
