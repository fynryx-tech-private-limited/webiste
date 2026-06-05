import type { Testimonial } from '../../types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-md border border-primary-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-sm font-bold text-primary-700">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="font-bold text-primary-900">{testimonial.name}</h4>
          <p className="text-sm text-slate-500">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-sm italic leading-relaxed text-slate-600">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </article>
  )
}
