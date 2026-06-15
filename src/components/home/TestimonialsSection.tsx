import { useState, useEffect } from 'react'
import { testimonials } from '../../data/testimonials'
import { SectionHeading } from '../ui/SectionHeading'
import { TestimonialCard } from '../ui/TestimonialCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(4)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [maxIndex])

  // Adjust index if window resizes and maxIndex decreases
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
    if (distance > minSwipeDistance && currentIndex < maxIndex) handleNext()
    if (distance < -minSwipeDistance && currentIndex > 0) handlePrev()
  }

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading title="Our Clients" />
        </div>

        {/* Slider Container */}
        <div className="relative mt-8 group px-8 sm:px-12">
          {/* Left Arrow */}
          {maxIndex > 0 && (
            <button 
              onClick={handlePrev} 
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-1 text-slate-300 hover:text-slate-500 transition-colors disabled:opacity-30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
          )}

          {/* Right Arrow */}
          {maxIndex > 0 && (
            <button 
              onClick={handleNext} 
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-1 text-slate-300 hover:text-slate-500 transition-colors disabled:opacity-30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
          )}

          {/* Slider Wrapper */}
          <div 
            className="overflow-hidden mx-[-12px]"
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
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="w-full shrink-0 px-3 py-4"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
