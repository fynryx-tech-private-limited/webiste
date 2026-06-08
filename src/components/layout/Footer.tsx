import { Link } from 'react-router-dom'
import { footerNav, socialLinks } from '../../data/navigation'
import { contactInfo } from '../../data/contact'
import { BRAND_TAGLINE } from '../../data/brand'
import { Logo } from '../ui/Logo'
import { SocialIcons } from '../ui/SocialIcons'

export function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="brand-tagline mt-3">{BRAND_TAGLINE}</p>
            <p className="mt-4 text-sm leading-relaxed">
              Over 10 years we help companies reach their financial and branding goals. A
              values-driven technology agency dedicated to innovation.
            </p>
          </div>

          <div>
            <h3 className="brand-eyebrow mb-4 text-primary-800">Our Address</h3>
            <p className="text-sm leading-relaxed">{contactInfo.address}</p>
          </div>

          <div>
            <h3 className="brand-eyebrow mb-4 text-primary-800">Our Mailbox</h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {contactInfo.email}
            </a>
            <h3 className="brand-eyebrow mb-2 mt-6 text-primary-800">Our Phone</h3>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {contactInfo.phone}
            </a>
          </div>

          <div>
            <h3 className="brand-eyebrow mb-4 text-primary-800">Quick Links</h3>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            Copyright &copy; {new Date().getFullYear()} Fynryx. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = SocialIcons[link.icon as keyof typeof SocialIcons]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-primary-600 transition-colors"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
