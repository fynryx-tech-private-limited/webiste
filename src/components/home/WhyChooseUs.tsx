import { motion } from 'framer-motion'
import { whyChooseUs } from '../../data/whyChooseUs'
import { SectionHeading } from '../ui/SectionHeading'

const floatDelays = [0, 1.5, 3, 4.5]

export function WhyChooseUs() {
  return (
    <section className="bg-primary-50 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeading title="Why Choose Us" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelays[i],
                }}
                className="h-full"
              >
                <motion.article
                  // @ts-ignore
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    boxShadow: '0 20px 60px rgba(20,184,166,0.25)',
                    borderColor: 'rgba(20,184,166,0.4)',
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                  className="p-6 h-full flex flex-col"
                >
                  <motion.span
                    className="text-4xl font-bold text-primary-200 inline-block origin-left"
                    whileHover={{ rotate: 5, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {String(item.id).padStart(2, '0')}
                  </motion.span>
                  <h3 className="mt-3 text-lg font-bold text-primary-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </motion.article>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
