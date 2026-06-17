import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchJobDetails } from '../services/zohoApi'
import type { JobOpening } from '../data/careers'
import { PageHero } from '../components/ui/PageHero'

export function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>()
  const [job, setJob] = useState<JobOpening | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    async function loadJob() {
      if (!jobId) return
      setIsLoading(true)
      try {
        const data = await fetchJobDetails(jobId)
        if (mounted) setJob(data || null)
      } catch (error) {
        console.error("Failed to load job details", error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    loadJob()
    return () => { mounted = false }
  }, [jobId])

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Job not found</h2>
        <Link to="/careers" className="text-primary-600 hover:underline mt-4 inline-block font-medium">
          &larr; Back to Careers
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHero
        title={job.title}
        subtitle={`${job.department} · ${job.location} · ${job.type}`}
      />

      <section className="py-12 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">About the Role</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {job.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Benefits</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed">
              {job.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-1 transition-all duration-300"
              >
                Apply for this Position
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Apply for {job.title}</h3>
                  <p className="text-sm text-slate-500">Please fill out the form below.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body (Zoho Form Iframe) */}
              <div className="flex-1 overflow-y-auto bg-slate-50">
                <iframe 
                  src="https://forms.zohopublic.in/adminfyn1/form/FYNRYXJobApplicationForm/formperma/w-BIKUwLdIZm-eWhHVw3fi7bKSfd-6hLB2Dn25VubyE" 
                  className="w-full h-full min-h-[700px] border-0"
                  title="Job Application Form"
                >
                  Loading…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
