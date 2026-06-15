import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../../data/services'

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  // Track client window size to make the carousel columns responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = services.length - visibleCount

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  // Auto scroll logic (optional, reset index if visibleCount clamps it)
  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, Math.max(maxIndex, 0)))
  }, [maxIndex])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe && currentIndex < maxIndex) handleNext()
    if (isRightSwipe && currentIndex > 0) handlePrev()
  }

  return (
    <section className="relative py-16 md:py-24 bg-primary-50 select-none overflow-hidden">
      {/* Subtle light background accents */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-teal-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />

      {/* Bottom fade — very subtle blend into dark section below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-[#020617]/6 to-transparent z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with vertical bar and slider navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-primary-100 pb-8">
          <div className="flex items-center gap-4">
            {/* Accent bar — slides in from left */}
            <motion.div
              className="h-10 w-[3px] bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ originY: 0 }}
            />

            {/* Heading — each word slides up one by one */}
            <h2 className="text-4xl font-extrabold tracking-tight text-primary-900 sm:text-5xl font-sans overflow-hidden">
              <motion.span
                className="flex flex-wrap gap-x-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.25 } },
                }}
              >
                {['Our', 'Services'].map((word) => (
                  <motion.span
                    key={word}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 28, filter: 'blur(5px)' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Carousel Slider Wrapper */}
        <div 
          className="relative mt-12 overflow-hidden mx-[-12px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="w-full shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                {/* Custom Image Card */}
                <Link
                  to={`/services#${service.id}`}
                  className="group relative block h-[480px] w-full overflow-hidden rounded-2xl bg-white border border-primary-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/60 hover:shadow-[0_8px_30px_rgba(20,184,166,0.18)]"
                >
                  {/* Background Cover Image with Zoom Transition */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  
                  {/* Gradient Dark Overlay (Transitions to Brand Teal on Hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-transparent opacity-75 transition-all duration-500 group-hover:from-teal-900/90 group-hover:via-teal-800/50 group-hover:to-transparent group-hover:opacity-90" />
                  
                  {/* Foreground Content */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10 text-left">
                    {/* Service Title */}
                    <h3 className="text-2xl font-bold font-sans text-white tracking-wide mb-3">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    {/* CTA link with right-translating arrow on hover */}
                    <div className="inline-flex items-center text-white font-semibold gap-2">
                      <span className="text-xs uppercase tracking-widest text-teal-400 font-bold transition-colors duration-300 group-hover:text-emerald-400">Discover</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-3.5" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-10 bg-teal-500 shadow-sm shadow-teal-500/30' 
                  : 'w-2.5 bg-teal-200/60 hover:bg-teal-300/80 hover:w-4'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
