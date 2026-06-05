import type { NavItem } from '../types'

export const mainNav: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Mobile Application', path: '/services#mobile' },
      { label: 'Web Application', path: '/services#web' },
      { label: 'Web Designing', path: '/services#design' },
      { label: 'Development Services', path: '/services#development' },
      { label: 'SEO Services', path: '/services#seo' },
      { label: 'Social Media Marketing', path: '/services#social' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Contacts', path: '/contact' },
]

export const footerNav = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Contacts', path: '/contact' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
]

export const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
]
