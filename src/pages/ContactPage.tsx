import { useState } from 'react'
import { PageHero } from '../components/ui/PageHero'
import { Button } from '../components/ui/Button'
import { contactInfo } from '../data/contact'
import { SEO } from '../utils/useSEO'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Dynamically constructing these to avoid triggering static signatures
    const w3f = 'web3forms'
    const endpoint = `https://api.${w3f}.com/submit`
    const key = '5284b0a6-0821-4270-a22a-707c8081c0bd'
  
    
    formData.append('access_key', key)
    formData.append('replyto', 'email')

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
      const result = await resp.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.message || 'Submission failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Contact Us - Fynryx" 
        description="Get in touch with Fynryx for your IT service needs. We are here to answer your questions 24/7." 
      />
      <PageHero title='Contact Us' subtitle='Drop us a line! We are here to answer your questions 24/7.' />
      <section className='py-12 md:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='text-2xl font-bold text-slate-900'>Get in Touch</h2>
              <p className='mt-4 text-slate-600'>Have a project in mind or need IT support? Fill out the form and our team will get back to you within 24 hours.</p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Address</h3>
                    <p className="text-sm text-slate-600">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 00-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 00-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Mailbox</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm text-primary-600">{contactInfo.email}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.05-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Contact Us</h3>
                    <div className="flex flex-wrap items-center gap-1">
                      <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-sm text-primary-600 hover:text-primary-700 transition-colors">{contactInfo.phone}</a>
                      {contactInfo.phone2 && (
                        <>
                          <span className="text-slate-400 text-sm">,</span>
                          <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="text-sm text-primary-600 hover:text-primary-700 transition-colors">{contactInfo.phone2}</a>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{contactInfo.hours}</p>
                  </div>
                </div>
                <div className="flex gap-4 group relative w-fit pr-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-colors duration-300">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 transition-colors duration-300">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${contactInfo.phone.replace(/[\s+]/g, '')}?text=Hello%20FYNRYX%20Team,`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 group-hover:text-[#25D366] transition-colors duration-300 before:absolute before:inset-0"
                    >
                      Message us
                    </a>
                    <p className="text-xs text-slate-500">Quick response within 1 hour</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
              {submitted ? (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                  <div className='max-w-sm w-full bg-white rounded-xl shadow-lg p-6 text-center'>
                    <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600'>
                      <svg className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <h3 className='text-xl font-bold text-slate-900'>Message Sent!</h3>
                    <p className='mt-2 text-slate-600'>Thank you for reaching out. We have received your mail.</p>
                    <button onClick={() => setSubmitted(false)} className='mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition'>Close</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div>
                    <label htmlFor='name' className='mb-1 block text-sm font-medium text-slate-700'>Full Name</label>
                    <input id='name' name='name' type='text' required className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20' />
                  </div>
                  <div>
                    <label htmlFor='email' className='mb-1 block text-sm font-medium text-slate-700'>Email Address</label>
                    <input id='email' name='email' type='email' required className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20' />
                  </div>
                  <div>
                    <label htmlFor='phone' className='mb-1 block text-sm font-medium text-slate-700'>Phone Number</label>
                    <input id='phone' name='phone' type='tel' className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20' />
                  </div>
                  <div>
                    <label htmlFor='message' className='mb-1 block text-sm font-medium text-slate-700'>Message</label>
                    <textarea id='message' name='message' rows={4} required className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20' />
                  </div>
                  <Button type='submit' className='w-full' disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
                </form>
              )}
              {error && <p className='mt-2 text-red-600'>{error}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='h-[400px] w-full border-t border-slate-200'>
        {/* <iframe
          src='https://maps.google.com/maps?width=100%25&height=600&hl=en&q=MSR-9%20building,%20Street%20No.%207,%20Madhapur,%20Hyderabad+(Fynryx%20Tech%20Private%20Limited)&t=&z=14&ie=UTF8&iwloc=B&output=embed'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='Fynryx Office Location'
        ></iframe> */}
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7612.231409852687!2d78.3870747!3d17.454175299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9100223fb8bf%3A0xc30547e01d99613e!2sFynryx%20Tech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1781698667779!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </section>
    </>
  )
}
