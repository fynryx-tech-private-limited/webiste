import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mainNav } from '../../data/navigation'
import { contactInfo } from '../../data/contact'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setAtTop(currentY < 10)

          if (currentY < 10) {
            setVisible(true)
          } else if (currentY < lastScrollY.current - 5) {
            // Scrolling UP → show
            setVisible(true)
          } else if (currentY > lastScrollY.current + 5) {
            // Scrolling DOWN → hide
            setVisible(false)
            setMobileOpen(false)
          }

          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
    }`

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
        atTop
          ? 'border-transparent bg-white/90 shadow-none'
          : 'border-primary-100 bg-white/95 shadow-[0_2px_20px_rgba(0,0,0,0.07)]'
      } backdrop-blur-md`}
      animate={{ y: visible ? 0 : '-100%' }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Main navbar row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Logo />

        {/* Desktop nav — centered */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink to={item.path} className={navClass}>
                  {item.label}
                </NavLink>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-primary-100 bg-white py-2 shadow-xl"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Right — contact info + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="text-right">
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-slate-400">
              Have Any Questions?
            </p>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="text-sm font-bold text-primary-800 hover:text-primary-600 transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>
          <Button to="/contact" size="sm">
            Free Quote
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md p-2 text-primary-700 transition-colors hover:bg-primary-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — animated expand/collapse */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-primary-100 bg-white px-4 py-4 lg:hidden"
          >
            {mainNav.map((item) => (
              <div key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-700 hover:text-primary-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                {item.children && (
                  <div className="ml-4 border-l border-primary-100 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-slate-600 transition-colors hover:text-primary-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 border-t border-primary-50 pt-4 space-y-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="block text-sm font-bold text-primary-800"
              >
                📞 {contactInfo.phone}
              </a>
              <Button to="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
                Free Quote
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
