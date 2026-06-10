import { useEffect, useState } from 'react'
import { heroSlides } from '../../data/heroSlides'
import { BRAND_TAGLINE } from '../../data/brand'
import { Button } from '../ui/Button'

function AnimatedWords({
  text,
  baseDelay = 0,
  variant = 'default',
}: {
  text: string
  baseDelay?: number
  variant?: 'default' | 'highlight'
}) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${text}-${index}`}
          className={`inline-block ${
            variant === 'highlight' ? 'hero-animate-highlight' : 'hero-animate-word'
          }`}
          style={{ animationDelay: `${baseDelay + index * 0.07}s` }}
        >
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </>
  )
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[activeIndex]
  const titleWordCount = slide.title.split(' ').length

  return (
    <section className="relative h-[520px] overflow-hidden bg-primary-950 text-white sm:h-[580px] lg:h-[660px]">
      {heroSlides.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${item.background})` }}
          aria-hidden={index !== activeIndex}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/10" />

      {/* Bottom fade — very subtle blend into section below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white/10 to-transparent z-10" />

      {/* Pixel-edge accent inspired by logo swoosh */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
        <div className="absolute right-12 top-1/4 h-32 w-2 bg-primary-400" />
        <div className="absolute right-16 top-1/3 h-24 w-2 bg-primary-300" />
        <div className="absolute right-20 top-2/5 h-16 w-2 bg-primary-200" />
      </div>

      <div className="relative mx-auto flex h-[520px] max-w-7xl items-center px-4 py-20 sm:h-[580px] sm:px-6 lg:h-[660px] lg:px-8">
        <div className="relative max-w-2xl">
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-md"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 60%)',
            }}
          />
          <div
            key={activeIndex}
            className="relative z-10 rounded-md bg-black/10 p-6 sm:p-8"
          >
            <p className="hero-animate-tagline brand-tagline text-accent-400">
              {BRAND_TAGLINE}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              <AnimatedWords text={slide.title} baseDelay={0.1} />
              <span className="mt-2 block">
                <AnimatedWords
                  text={slide.highlight}
                  baseDelay={0.1 + titleWordCount * 0.07 + 0.1}
                  variant="highlight"
                />
              </span>
            </h1>
            <p className="hero-animate-desc mt-6 text-lg leading-relaxed text-primary-100">
              {slide.description}
            </p>
            <div className="hero-animate-cta mt-8 flex flex-wrap gap-4">
              <Button to={slide.ctaPath} size="lg">
                {slide.ctaLabel}
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
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
