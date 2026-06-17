import { Link } from 'react-router-dom'
import { footerNav, socialLinks } from '../../data/navigation'
import { contactInfo } from '../../data/contact'

import { Logo } from '../ui/Logo'
import { SocialIcons } from '../ui/SocialIcons'

export function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between">
          <div className="lg:max-w-[320px]">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed">
              Over 10 years we help companies reach their financial and branding goals. A
              values-driven technology agency dedicated to innovation.
            </p>
          </div>

          <div className="lg:max-w-[280px]">
            <h3 className="font-semibold text-slate-900 mb-4">Address</h3>
            <p className="text-sm leading-relaxed">{contactInfo.address}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Mailbox</h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
            >
              {contactInfo.email}
            </a>
            <h3 className="font-semibold text-slate-900 mb-2 mt-6">Contact Us</h3>
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
              >
                {contactInfo.phone}
              </a>
              {contactInfo.phone2 && (
                <a
                  href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`}
                  className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
                >
                  {contactInfo.phone2}
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
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
