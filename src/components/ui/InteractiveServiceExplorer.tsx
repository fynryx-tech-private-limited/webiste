import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { Service } from '../../types'
import { serviceIconMap } from './ServiceIcons'
import { Button } from './Button'

interface InteractiveServiceExplorerProps {
  services: Service[]
}

export function InteractiveServiceExplorer({ services }: InteractiveServiceExplorerProps) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)
  
  const handleCardClick = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id))
  }

  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeServiceId && detailsRef.current) {
      setTimeout(() => {
        const yOffset = -100 // adjust for sticky header if needed
        const element = detailsRef.current
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 150)
    }
  }, [activeServiceId])

  const activeService = services.find((s) => s.id === activeServiceId)

  return (
    <div className="relative py-12">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
          >
            Explore Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 mx-auto max-w-2xl text-lg text-slate-600"
          >
            Discover our comprehensive suite of digital solutions designed to elevate your business in the modern landscape.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isActive={activeServiceId === service.id}
              onClick={() => handleCardClick(service.id)}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <div ref={detailsRef}>
          <AnimatePresence mode="wait">
            {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 overflow-hidden rounded-[32px] border border-white/20 bg-white/40 p-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
            >
              <div className="relative overflow-hidden rounded-[24px] bg-slate-900 shadow-inner">
                {/* Panel Background Effect */}
                <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-teal-500/20 blur-[100px]" />
                
                <div className="grid lg:grid-cols-2">
                  {/* Left Side: Image Showcase */}
                  <div className="relative h-64 lg:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent z-10 lg:hidden" />
                    {activeService.image ? (
                      <img 
                        src={activeService.image} 
                        alt={activeService.title} 
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <div className="text-slate-600 [&_svg]:h-24 [&_svg]:w-24">
                          {serviceIconMap[activeService.icon]}
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90 lg:bg-gradient-to-r" />
                  </div>

                  {/* Right Side: Details Content */}
                  <div className="relative z-20 p-8 lg:p-12 text-slate-300">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-400">
                      <span className="[&_svg]:h-4 [&_svg]:w-4">{serviceIconMap[activeService.icon]}</span>
                      {activeService.title}
                    </div>
                    
                    <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl tracking-tight">
                      {activeService.title}
                    </h3>
                    
                    <p className="mb-8 text-lg leading-relaxed text-slate-400">
                      {activeService.fullDescription || activeService.description}
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2">
                      {/* Features */}
                      {activeService.features && activeService.features.length > 0 && (
                        <div>
                          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Key Features</h4>
                          <ul className="space-y-3">
                            {activeService.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                                <span className="text-slate-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      {activeService.technologies && activeService.technologies.length > 0 && (
                        <div>
                          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {activeService.technologies.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="rounded-md border border-slate-700/50 bg-slate-800/50 px-2.5 py-1 text-sm font-medium text-slate-300 backdrop-blur-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-10">
                      <Button to="/contact" className="w-full sm:w-auto shadow-lg shadow-teal-500/20">
                        Schedule a Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, index, isActive, onClick }: { service: Service, index: number, isActive: boolean, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-8 transition-all duration-500 ${
        isActive 
          ? 'border-teal-400/60 bg-white/60 shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)] backdrop-blur-xl' 
          : 'border-slate-200/60 bg-white/40 shadow-sm backdrop-blur-md hover:border-teal-400/40 hover:bg-white/80 hover:shadow-[0_25px_80px_-20px_rgba(20,184,166,0.15)]'
      }`}
    >
      {/* Radial Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20,184,166,0.08), transparent 40%)`,
        }}
      />
      
      {/* Active State Glow Overlay */}
      <div className={`pointer-events-none absolute inset-0 bg-teal-50/30 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 flex h-full flex-col">
        {/* Top: Icon & Title */}
        <div className="mb-6 flex items-start justify-between">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 scale-110 rotate-3' : 'bg-primary-100 text-primary-600 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-teal-100 group-hover:text-teal-600'}`}>
            <span className="[&_svg]:h-7 [&_svg]:w-7">
              {serviceIconMap[service.icon]}
            </span>
          </div>
          

        </div>

        <h3 className={`mb-3 text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-teal-900' : 'text-slate-900 group-hover:text-teal-900'}`}>
          {service.title}
        </h3>

        {/* Middle: Description */}
        <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {service.description}
        </p>

        {/* Bottom: Animated CTA */}
        <div className="mt-auto flex items-center text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-teal-600">
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Service</span>
            <span className="absolute left-0 top-0 inline-block translate-y-full text-teal-600 transition-transform duration-300 group-hover:translate-y-0">
              {isActive ? 'Close Details' : 'View Details'}
            </span>
          </span>
          <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isActive ? 'rotate-90 text-teal-600' : 'group-hover:translate-x-1.5'}`} />
        </div>
      </div>
    </motion.div>
  )
}
