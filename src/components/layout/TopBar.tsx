import { contactInfo } from '../../data/contact'
import { socialLinks } from '../../data/navigation'
import { BRAND_TAGLINE } from '../../data/brand'
import { SocialIcon } from '../ui/SocialIcon'

export function TopBar() {
  return (
    <div className="hidden border-b border-primary-800 bg-primary-900 text-sm text-primary-100 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
            {contactInfo.email}
          </a>
          <span className="text-primary-300">{contactInfo.hours}</span>
          <span className="brand-tagline hidden text-primary-300 xl:inline">
            {BRAND_TAGLINE}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary-300 transition-colors hover:text-accent-400"
              aria-label={link.label}
              title={link.label}
            >
              <SocialIcon platform={link.label} className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
