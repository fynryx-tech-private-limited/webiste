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
      { label: 'Salesforce Consulting', path: '/services#salesforce' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contacts', path: '/contact' },
]

export const footerNav = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contacts', path: '/contact' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
]

export const socialLinks = [
  // { label: 'X', href: 'https://x.com', icon: 'Twitter' },
  { label: 'Facebook', href: 'https://www.facebook.com/fynryx', icon: 'Facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/fynryx-tech-private-limited/', icon: 'Linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/fynryx?igsh=dmU2Z2QxcnV2ZjJq', icon: 'Instagram' },
]
