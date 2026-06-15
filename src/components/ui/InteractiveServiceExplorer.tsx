import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { Service } from '../../types'
import { serviceIconMap } from './ServiceIcons'
import { Button } from './Button'

interface InteractiveServiceExplorerProps {
  services: Service[]
  initialActiveId?: string
}

export function InteractiveServiceExplorer({ services, initialActiveId }: InteractiveServiceExplorerProps) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(initialActiveId ?? null)
  
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCardClick = (id: string) => {
    if (clickTimeout.current) clearTimeout(clickTimeout.current)
    
    clickTimeout.current = setTimeout(() => {
      setActiveServiceId((prev) => {
        const isOpening = prev !== id
        
        if (isOpening) {
          // Scroll into view on next tick to allow layout calculation
          setTimeout(() => {
            const isDesktop = window.innerWidth >= 1024
            const targetSelector = isDesktop ? '#service-desktop-panel' : `[data-service-id="${id}"]`
            const el = document.querySelector(targetSelector) || document.querySelector(`[data-service-id="${id}"]`)
            
            if (el) {
              const headerOffset = isDesktop ? 150 : 100 // Approximation for sticky header
              const elementPosition = el.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.scrollY - headerOffset

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }
          }, 150)
        }
        
        return isOpening ? id : null
      })
    }, 150)
  }

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
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

        {/* Desktop Details Panel */}
        <div id="service-desktop-panel" className="hidden lg:block">
          <AnimatePresence mode="wait">
            {activeServiceId && (() => {
              const activeService = services.find(s => s.id === activeServiceId)
              if (!activeService) return null
              
              return (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 overflow-hidden rounded-[2rem] bg-white border border-teal-100 shadow-[0_20px_60px_-15px_rgba(20,184,166,0.15)] flex"
                >
                  <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-sm">
                        <span className="[&_svg]:h-8 [&_svg]:w-8">
                          {serviceIconMap[activeService.icon]}
                        </span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-slate-900">{activeService.title}</h3>
                    </div>
                    
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                      {activeService.fullDescription || activeService.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      {activeService.features && activeService.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4 tracking-tight">Key Features</h4>
                          <ul className="space-y-3">
                            {activeService.features.map((f, i) => (
                              <li key={i} className="flex items-start text-sm text-slate-600">
                                <CheckCircle2 className="h-5 w-5 text-teal-500 mr-2 shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {activeService.technologies && activeService.technologies.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4 tracking-tight">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {activeService.technologies.map((t, i) => (
                              <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/60">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <Button to="/contact" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3">
                        Request a Free Quote
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-1/2 relative bg-slate-50">
                    {activeService.image ? (
                      <img 
                        src={activeService.image} 
                        alt={activeService.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="[&_svg]:h-32 [&_svg]:w-32 text-slate-200">
                          {serviceIconMap[activeService.icon]}
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay to blend image with text area */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, index, isActive, onClick }: { service: Service, index: number, isActive: boolean, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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
      data-service-id={service.id}
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-500 ${
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
          <h3 className={`mb-3 text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-teal-900' : 'text-slate-900 group-hover:text-teal-900'}`}>{service.title}</h3>
        </div>

        {/* Middle: Description */}
        <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {service.description}
        </p>

        {/* Bottom: CTA */}
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

      {/* Expanded Details – slide down */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mt-6 overflow-hidden rounded-[24px] bg-white/90 p-4 shadow-lg backdrop-blur-md"
          >
            {/* Image / Icon */}
            <div className="mb-4">
              {service.image ? (
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded" />
              ) : (
                <div className="flex items-center justify-center h-48 bg-slate-200 rounded">
                  {serviceIconMap[service.icon]}
                </div>
              )}
            </div>
            {/* Title */}
            <h4 className="mb-2 text-xl font-bold text-primary-800">{service.title}</h4>
            {/* Description */}
            <p className="mb-4 text-slate-600">{service.fullDescription || service.description}</p>
            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-4">
                <h5 className="mb-2 font-medium text-slate-700">Key Features</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-4">
                <h5 className="mb-2 font-medium text-slate-700">Technologies</h5>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, i) => (
                    <span key={i} className="rounded bg-slate-200 px-2 py-1 text-xs text-slate-700">{tech}</span>
                  ))}
                </div>
              </div>
            )}
            {/* CTA Button */}
            <Button to="/contact" className="mt-2 w-full bg-primary-600 hover:bg-primary-700 text-white">
              Request a Free Quote
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
