import { Button } from '../ui/Button'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary-600 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-primary-400)_0%,_transparent_50%)] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="brand-eyebrow text-accent-300">
          Drop us a line! We are here to answer your questions 24/7
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Need a Consultation?</h2>
        <Button to="/contact" variant="outline" className="mt-8 border-white hover:bg-white hover:text-primary-800" size="lg">
          Contact Us
        </Button>
      </div>
    </section>
  )
}
