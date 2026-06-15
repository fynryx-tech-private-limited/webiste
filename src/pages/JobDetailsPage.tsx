import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchJobDetails } from '../services/sheetsApi'
import type { JobOpening } from '../data/careers'
import { PageHero } from '../components/ui/PageHero'

export function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>()
  const [job, setJob] = useState<JobOpening | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
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
              </motion.div>
            </div>

            {/* Right Column: Application Form (ZOHO) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-xl border border-primary-100 sticky top-24"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">Apply for this position</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Please fill out the form below to submit your application.
                </p>
                
                {/* ZOHO Forms Container */}
                <div className="w-full min-h-[500px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                  {/* 
                    NOTE TO DEVELOPER: 
                    Replace the content of this div with the ZOHO forms embed code (iframe or script).
                    Example:
                    <iframe src="YOUR_ZOHO_FORM_URL" className="w-full h-[600px] border-0 rounded-xl"></iframe>
                  */}
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-700 mb-2">Zoho Form Integration</h4>
                  <p className="text-sm text-slate-500">
                    Embed your Zoho form iframe or script here to collect applicant data directly.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
