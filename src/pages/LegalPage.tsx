import { Helmet } from 'react-helmet-async'
import { PageHero } from '../components/ui/PageHero'

interface LegalPageProps {
  title: string
  sections: { heading: string; content: string }[]
  description?: string
}

export function LegalPage({ title, sections, description }: LegalPageProps) {
  const isPrivacyPolicy = title === 'Privacy Policy'
  const metaDescription = description || `${title} for Fynryx. Learn about our policies and terms.`

  return (
    <>
      <Helmet>
        <title>{title} | Fynryx</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://fynryx.com/${isPrivacyPolicy ? 'privacy-policy' : 'terms'}`} />
      </Helmet>
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
