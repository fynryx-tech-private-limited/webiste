import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      /* entrance */
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      /* hover lift */
      whileHover={{ y: -15, scale: 1.02 }}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.4s ease',
        willChange: 'transform',
        cursor: 'pointer',
      }}
      className="group relative shadow-md hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
    >
      {/* Image container */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Cursor glow spotlight */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(20,184,166,0.15), transparent 70%)`,
          }}
        />

        {/* Image with zoom on hover */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.3) 60%, transparent 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-teal-400 mb-1">
              {project.category}
            </p>
            <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
          </motion.div>

          {/* Arrow slides right on hover */}
          <motion.div
            className="mt-3 flex items-center gap-1.5 text-teal-400"
            initial={{ x: -6, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <span className="text-xs font-semibold tracking-wider uppercase">View</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Card body — visible when NOT hovering */}
      <div className="p-5 border-t border-primary-50 relative z-10">
        <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-teal-500 mb-1">
          {project.category}
        </p>
        <h3 className="text-base font-bold text-primary-900 leading-snug">{project.title}</h3>

        {/* Bottom gradient line */}
        <div
          className="mt-3 h-[2px] w-8 rounded-full opacity-60 group-hover:w-full transition-all duration-500"
          style={{ background: 'linear-gradient(90deg, #14B8A6, #34D399)' }}
        />
      </div>

      {/* Glass edge highlight */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      />
    </motion.article>
  )
}
