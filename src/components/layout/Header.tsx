import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { mainNav } from '../../data/navigation'
import { contactInfo } from '../../data/contact'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link rounded-md px-3 py-2 ${
      isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

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
                {servicesOpen && (
                  <div className="absolute left-0 top-full z-50 w-56 rounded-md border border-primary-100 bg-white py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
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

        <div className="hidden items-center gap-4 lg:flex">
          <div className="text-right">
            <p className="brand-eyebrow text-[0.6rem] text-slate-400">
              Have Any Questions?
            </p>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="text-sm font-bold text-primary-800"
            >
              {contactInfo.phone}
            </a>
          </div>
          <Button to="/contact" size="sm">
            Free Quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-primary-700 lg:hidden"
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

      {mobileOpen && (
        <nav className="border-t border-primary-100 bg-white px-4 py-4 lg:hidden">
          {mainNav.map((item) => (
            <div key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-700'
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
                      className="block py-1.5 text-sm text-slate-600 hover:text-primary-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
            <Button to="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
              Free Quote
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
