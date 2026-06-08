import { whyChooseUs } from '../../data/whyChooseUs'
import { SectionHeading } from '../ui/SectionHeading'

export function WhyChooseUs() {
  return (
    <section className="bg-primary-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading title="Why Choose Us" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article
              key={item.id}
              className="rounded-md border border-primary-100 bg-white p-6 shadow-sm"
            >
              <span className="text-4xl font-bold text-primary-200">
                {String(item.id).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-bold text-primary-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
