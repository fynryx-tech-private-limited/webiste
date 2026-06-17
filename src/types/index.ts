export interface NavLink {
  label: string
  path: string
}

export interface NavItem extends NavLink {
  children?: NavLink[]
}

export interface HeroSlide {
  id: number
  title: string
  highlight: string
  description: string
  ctaLabel: string
  ctaPath: string
  background: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  fullDescription?: string
  features?: string[]
  technologies?: string[]
  image?: string
}

export interface WhyChooseItem {
  id: number
  title: string
  description: string
}

export interface Stat {
  id: string
  value: string
  suffix: string
  label: string
}

export interface Project {
  id: string
  title: string
  category: string
  image: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  initials: string
}

export interface ContactInfo {
  address: string
  email: string
  phone: string
  phone2?: string
  hours: string
}
