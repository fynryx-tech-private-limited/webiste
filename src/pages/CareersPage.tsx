import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { motion } from 'framer-motion'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchJobOpenings } from '../services/zohoApi'
import type { JobOpening } from '../data/careers'
import { SEO } from '../utils/useSEO'

export function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function loadJobs() {
      try {
        const data = await fetchJobOpenings()
        if (mounted) setJobs(data)
      } catch (error) {
        console.error("Failed to load jobs", error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    loadJobs()
    return () => { mounted = false }
  }, [])

  return (
    <>
      <SEO 
        title="Careers at Fynryx" 
        description="Join our dynamic team and help us build the future of technology solutions. View our open positions and life at Fynryx." 
      />
      <PageHero
        title="Careers at Fynryx"
        subtitle="Join our dynamic team and help us build the future of technology solutions."
      />

      {/* About Careers Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/careers-team.jpg"
                alt="Team working together at Fynryx"
                loading="lazy"
                decoding="async"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Life at <span className="text-primary-600">FYNRYX</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                At FYNRYX, we believe that our greatest asset is our people. We are a collective of passionate technologists, creative thinkers, and problem solvers dedicated to pushing the boundaries of what's possible.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                When you join our team, you're not just taking a job—you're embarking on a journey to innovate, learn, and grow. We foster a culture of continuous learning, open collaboration, and mutual respect. Whether we're building complex web applications or designing intuitive user experiences, we do it together with a shared vision of excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Open Positions"
            description="Discover your next career opportunity with us."
          />
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                  <p className="text-lg font-medium text-slate-900 mb-2">No open positions right now</p>
                  <p>Please check back later for new opportunities at FYNRYX.</p>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                          <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md font-medium">{job.department}</span>
                          <span className="bg-slate-100 px-2 py-1 rounded-md">{job.location}</span>
                          <span className="bg-slate-100 px-2 py-1 rounded-md">{job.type}</span>
                        </div>
                      </div>
                      <Link
                        to={`/careers/${job.id}`}
                        className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors whitespace-nowrap"
                      >
                        Apply Now
                      </Link>
                    </div>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {job.shortDescription}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Right side: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block sticky top-24"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px] isolate">
                <img
                  src="/office-space.jpg"
                  alt="Office interior"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-900/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Why Join Us?"
            description="We offer competitive benefits, a collaborative environment, and opportunities for continuous growth."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🚀
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Growth</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Continuous learning and career advancement opportunities.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                💡
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Innovation</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Work with cutting-edge technologies on exciting projects.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Culture</h4>
              <p className="text-slate-600 text-sm leading-relaxed">A supportive, inclusive, and collaborative work environment.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
