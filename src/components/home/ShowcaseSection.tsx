import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShowcaseCanvas } from './ShowcaseCanvas'
import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

// --- Magnetic Button Component ---
interface MagneticButtonProps {
  children: React.ReactNode
  to: string
  variant: 'primary' | 'secondary'
}

function MagneticButton({ children, to, variant }: MagneticButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out"
  
  const variantStyles = variant === 'primary'
    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm shadow-teal-500/10 border border-teal-400/20 hover:shadow-md hover:shadow-teal-500/25"
    : "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantStyles}`}
    >
      {/* Background glow for primary button */}
      {variant === 'primary' && (
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60 pointer-events-none" />
      )}
      
      {children}
    </Link>
  )
}

// --- Main Showcase Section Component ---
export function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 50, y: 50 })
  const mouse = useRef({ x: 0, y: 0 })
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)

  const rotatingHeadings = [
    { id: 1, title: 'Empower Your Business', highlight: 'with Cutting-Edge IT Solutions' },
    { id: 2, title: 'Custom IT Solutions', highlight: 'for Every Industry' },
    { id: 3, title: 'Proactive Support', highlight: 'for Maximum Uptime' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % rotatingHeadings.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [rotatingHeadings.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Percentage for background radial-gradient
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100
    setCoords({ x: pctX, y: pctY })

    // Normalized coordinates (-1 to 1) for Three.js
    mouse.current.x = (x / rect.width) * 2 - 1
    mouse.current.y = -(y / rect.height) * 2 + 1
  }

  const handleMouseLeave = () => {
    // Smooth reset
    mouse.current.x = 0
    mouse.current.y = 0
  }

  // Split headline text for character-by-character reveal
  const line2Words = ["Design", "Innovate", "Transform"]


  // Word-by-word reveal for the second line
  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.3 // Show after line 1 completes
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 120
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.0,
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen w-full flex-col items-center justify-center pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden bg-[#020617] select-none"
    >
      {/* Top fade — very subtle blend from light section above */}
      <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none bg-gradient-to-b from-[#f0fdfb]/8 to-transparent" />

      {/* Bottom fade — very subtle blend into light section below */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none bg-gradient-to-t from-[#f0fdfb]/8 to-transparent" />
      {/* Interactive Background Spotlight (Reacts to Cursor) */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(550px circle at ${coords.x}% ${coords.y}%, rgba(20, 184, 166, 0.16), rgba(15, 118, 110, 0.05) 45%, rgba(2, 6, 23, 0.95) 100%)`
        }}
      />

      {/* Floating Decorative CSS Blobs for Ambient Depth */}
      <div className="absolute top-[15%] left-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-teal-800/10 blur-[80px] animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] -z-10 h-[400px] w-[400px] rounded-full bg-emerald-800/10 blur-[100px] animate-pulse duration-[12000ms] pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <ShowcaseCanvas mouse={mouse} />

      {/* Foreground Content Layer */}
      <div className="relative z-20 flex flex-1 w-full max-w-5xl flex-col items-center justify-between px-4 text-center py-4 sm:py-8">
        <div className="flex flex-col items-center gap-2 mt-4 sm:mt-8 pointer-events-none">
          {/* Line 1 - Unified Glossy Continuous Flow Heading */}
          <h1
            className="flex flex-wrap justify-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-sans text-transparent bg-clip-text bg-[linear-gradient(to_right,#14b8a6_0%,#5eead4_20%,#e5e7eb_40%,#ffffff_50%,#e5e7eb_60%,#5eead4_80%,#14b8a6_100%)] animate-text-shimmer pb-2"
          >
            Start Building the Future with FYNRYX
          </h1>

          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-semibold sm:text-xs md:text-xs tracking-[0.2em] uppercase text-center text-white/80"
          >
            {line2Words.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Rotating Middle Headings */}
        <div className="flex-none sm:flex-1 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] mt-8 mb-4 sm:my-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeadingIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-3 sm:gap-4"
            >
              <motion.h2
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide"
              >
                {rotatingHeadings[currentHeadingIndex].title.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex mr-2 md:mr-3 last:mr-0">
                    <motion.span 
                      variants={wordVariants}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>

              <motion.p
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center text-xl sm:text-2xl md:text-3xl font-semibold text-white/90"
              >
                {rotatingHeadings[currentHeadingIndex].highlight.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex mr-2 md:mr-3 last:mr-0">
                    <motion.span variants={wordVariants}>{word}</motion.span>
                  </span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Actions (CTAs) (Bottom) */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 sm:mt-auto mb-4 md:mb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <MagneticButton to="/contact" variant="primary">
            <span>Start Your Project</span>
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>

          <MagneticButton to="/services" variant="secondary">
            <Compass className="h-4 w-4" />
            <span>Explore Services</span>
          </MagneticButton>
        </motion.div>
      </div>


    </section>
  )
}
