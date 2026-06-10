import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShowcaseCanvas } from './ShowcaseCanvas'
import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { stats } from '../../data/stats'
import { StatCounter } from '../ui/StatCounter'

// --- Magnetic Button Component ---
interface MagneticButtonProps {
  children: React.ReactNode
  to: string
  variant: 'primary' | 'secondary'
}

function MagneticButton({ children, to, variant }: MagneticButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out"
  
  const variantStyles = variant === 'primary'
    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25 border border-teal-400/30 hover:shadow-teal-500/40"
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
  const headlineLine1 = "Start Building the Future with FYNRYX"
  const line2Words = ["Design -", "Innovate -", "Transform"]

  // Container motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      }
    }
  }

  // Individual character motion variants
  const charVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 150
      }
    }
  }

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
      className="relative flex min-h-screen w-full flex-col items-center justify-center pt-24 pb-36 overflow-hidden bg-[#020617] select-none"
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
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center justify-between px-4 text-center">
        {/* Headline Container */}
        <div className="flex flex-col items-center gap-6 mt-16 pointer-events-none">
          {/* Line 1 - Character Reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-sans"
          >
            {headlineLine1.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={charVariants}
                className={char === " " ? "mr-3 md:mr-4" : ""}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Line 2 - Word Reveal with Gradient Glows */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 text-lg font-bold sm:text-2xl md:text-3xl tracking-[0.15em] uppercase"
          >
            {line2Words.map((word, idx) => {
              const colors = [
                "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]",
                "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]",
                "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
              ]
              return (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className={colors[idx]}
                >
                  {word}
                </motion.span>
              )
            })}
          </motion.div>
        </div>

        {/* Call to Actions (CTAs) */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 flex flex-col sm:flex-row items-center gap-6"
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

        {/* Stats Section Integrated */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-20 w-full max-w-full px-6 sm:px-12 lg:px-24 border-t border-white/5 pt-16"
        >
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.id} stat={stat} />
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  )
}
