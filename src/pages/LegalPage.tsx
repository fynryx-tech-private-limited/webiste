import { PageHero } from '../components/ui/PageHero'

interface LegalPageProps {
  title: string
  sections: { heading: string; content: string }[]
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} />
      <section className="py-20">
        <div className="prose prose-slate mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <div key={section.heading} className="mb-8">
              <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
