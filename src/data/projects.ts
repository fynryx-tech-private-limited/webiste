import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'livraah-living',
    title: 'Livraah Living',
    category: 'PG Management / SaaS',
    image: '/LIVRAA.png',
    client: 'Livraah Living',
    year: '2026',
    summary:
      'A modern SaaS platform for paying guest (PG) and hostel management — covering listings, bookings, tenants, and operations in one place.',
    description: [
      'Livraah Living needed a digital system to manage PG properties, room availability, tenant onboarding, and day-to-day operations without spreadsheets and WhatsApp chaos.',
      'We designed and built a full SaaS product with dashboards for property owners and staff, online discovery for tenants, and workflows for bookings, payments, and occupancy tracking.',
      'The result is a scalable platform that streamlines hostel operations and gives owners real-time visibility into their properties.',
    ],
    features: [
      'Property and room inventory management',
      'Tenant onboarding and occupancy tracking',
      'Booking and availability workflows',
      'Owner and staff role-based dashboards',
      'Responsive web experience for desktop and mobile',
    ],
     technologies: [],
  },
  {
    id: 'iaraa',
    title: 'IARAA',
    category: 'Ecommerce / Online Store',
    image: '/IARAA.jpeg',
    client: 'IARAA',
    year: '2025',
    summary:
      'An ecommerce experience built to showcase products, simplify checkout, and help the brand grow online sales with a clean, conversion-focused storefront.',
    description: [
      'IARAA required an online store that reflected their brand identity while making browsing and purchasing simple for customers.',
      'We delivered a custom ecommerce front end with product catalogs, category browsing, and a clear purchase flow — designed for speed, clarity, and mobile-first shopping.',
      'The storefront supports brand storytelling alongside product discovery, helping IARAA reach customers beyond their offline channels.',
    ],
    features: [
      'Product catalog and category browsing',
      'Brand-focused visual storefront',
      'Mobile-optimized shopping experience',
      'Clear product detail and CTA flows',
      'Scalable structure for future catalog growth',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Ecommerce APIs'],
  },
  {
    id: 'crm-system',
    title: 'CRM System',
    category: 'CRM / SaaS / PG Management',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPzSM0I4-lqFzXG5p5lJ8mC25hnUV66_pxRqzJ-iqu1hi7zgQYudpR18C&s=10',
    client: 'Internal / Client CRM',
    year: '2026',
    summary:
      'A CRM tailored for PG and hospitality operations — centralizing leads, tenants, follow-ups, and relationship management in one SaaS workspace.',
    description: [
      'Property teams needed a single place to track inquiries, convert leads into tenants, and manage ongoing relationships without losing context across tools.',
      'We built a CRM system focused on PG management workflows: lead capture, follow-up reminders, tenant records, and pipeline visibility for sales and operations teams.',
      'The platform helps teams close faster, reduce drop-offs, and keep every customer interaction organized.',
    ],
    features: [
      'Lead capture and pipeline management',
      'Follow-up reminders and activity tracking',
      'Tenant and contact records',
      'Team collaboration and role access',
      'Dashboards for conversion and occupancy insights',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
