import { useEffect, useState } from 'react'
import { heroSlides } from '../../data/heroSlides'
import { BRAND_TAGLINE } from '../../data/brand'
import { Button } from '../ui/Button'

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[activeIndex]

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-primary-950 text-white lg:min-h-[600px]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900/95 to-primary-800/80" />

      {/* Pixel-edge accent inspired by logo swoosh */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
        <div className="absolute right-12 top-1/4 h-32 w-2 bg-primary-400" />
        <div className="absolute right-16 top-1/3 h-24 w-2 bg-primary-300" />
        <div className="absolute right-20 top-2/5 h-16 w-2 bg-primary-200" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[600px] lg:px-8">
        <div className="max-w-2xl">
          <p className="brand-tagline text-accent-400">{BRAND_TAGLINE}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
            <span className="mt-2 block text-accent-400">{slide.highlight}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-100">{slide.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to={slide.ctaPath} size="lg">
              {slide.ctaLabel}
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 transition-all ${
              index === activeIndex
                ? 'w-8 rounded-sm bg-accent-400'
                : 'w-2 rounded-full bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
