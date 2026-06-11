import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'web',
    title: 'Web Application',
    description:
      'We carry more than just good coding skills. Our experience makes us stand out from other web development.',
    icon: 'globe',
    fullDescription:
      'Our web application development services combine cutting-edge technology with strategic thinking to create scalable, secure, and user-centric web solutions. We specialize in building responsive web applications that work seamlessly across all devices and browsers.',
    features: [
      'Full-Stack Web Development',
      'Progressive Web Apps (PWA)',
      'Real-time Data Applications',
      'Payment Gateway Integration',
      'Cloud Deployment & Hosting',
      'Performance Optimization',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    // image: '/services/web.png',
    image: 'https://images.pexels.com/photos/1181449/pexels-photo-1181449.jpeg',
  },
  {
    id: 'development',
    title: 'Development Services',
    description:
      'Custom web and mobile apps, tailored software, and e-commerce solutions to enhance functionality and growth.',
    icon: 'code',
    fullDescription:
      'We provide comprehensive development services tailored to your unique business needs. From complex enterprise software to reliable integrations and modernized legacy systems, our experienced team delivers solutions that drive real business value.',
    features: [
      'Custom Software Development',
      'Enterprise Solutions',
      'System Integration',
      'Legacy System Modernization',
      'API Development',
      'Database Design & Optimization',
    ],
    technologies: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'Kubernetes', 'Redis'],
    // image: '/services/development.png',
    image: 'https://plus.unsplash.com/premium_photo-1683836722608-60ab4d1b58e5?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    description:
      'Create complex enterprise software, ensure reliable software integration, modernise your legacy system.',
    icon: 'smartphone',
    fullDescription:
      'Our mobile application development expertise spans both iOS and Android platforms. We create intuitive, feature-rich mobile apps that engage users and deliver measurable business results. Whether native or cross-platform, we build apps that perform.',
    features: [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Mobile UX/UI Design',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    image: 'https://images.pexels.com/photos/892757/pexels-photo-892757.jpeg',
    // image: '/services/mobile.png',
  },
  {
    id: 'seo',
    title: 'SEO Services',
    description:
      'Optimize your website, improve search rankings, drive organic traffic, and increase visibility for sustainable growth.',
    icon: 'search',
    fullDescription:
      'Our SEO experts help your business rank higher in search results and attract qualified organic traffic. We implement proven strategies that align with search engine algorithms and user intent to drive sustainable growth.',
    features: [
      'Technical SEO Audit',
      'On-Page Optimization',
      'Keyword Research & Strategy',
      'Link Building',
      'Content Strategy',
      'SEO Analytics & Reporting',
    ],
    technologies: ['Google Analytics', 'Ahrefs', 'SEMrush', 'Lighthouse', 'Search Console', 'Screaming Frog'],
    // image: '/services/seo.png',
    image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg',
  },
  {
    id: 'design',
    title: 'Web Designing',
    description:
      'Build the product you need on time with an experienced team that uses a clear and effective design process.',
    icon: 'palette',
    fullDescription:
      'We create stunning, user-centric web designs that not only look great but also convert visitors into customers. Our design process combines strategic thinking, creative excellence, and technical expertise to deliver designs that drive results.',
    features: [
      'UI/UX Design',
      'Responsive Design',
      'Wireframing & Prototyping',
      'Brand Design',
      'Web Design Consultation',
      'Design System Development',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Illustrator', 'Tailwind CSS'],
    image: 'https://images.pexels.com/photos/36747234/pexels-photo-36747234.jpeg',
    // image: '/services/design.png',
  },
  {
    id: 'social',
    title: 'Social Media Marketing',
    description:
      'Increase brand awareness, engage your audience, and drive conversions with targeted campaigns across platforms.',
    icon: 'share',
    fullDescription:
      'Our social media marketing strategies help you build a strong online presence, engage your audience, and drive meaningful business results. We create compelling content and campaigns that resonate with your target market.',
    features: [
      'Social Media Strategy',
      'Content Creation',
      'Community Management',
      'Paid Social Advertising',
      'Influencer Marketing',
      'Social Analytics & Reporting',
    ],
    technologies: ['Hootsuite', 'Buffer', 'Sprout Social', 'Meta Ads', 'Canva', 'HubSpot'],
    image: 'https://images.pexels.com/photos/5361086/pexels-photo-5361086.jpeg',
    // image: '/services/social.png',
  },
  {
    id: 'salesforce',
    title: 'Salesforce Consulting',
    description:
      'Optimize your CRM, automate workflows, and drive sales with our expert Salesforce implementation and consulting services.',
    icon: 'cloud',
    fullDescription:
      'We provide end-to-end Salesforce consulting services to help you maximize your CRM investment. From implementation and customization to integration and ongoing support, our certified experts ensure your Salesforce instance aligns perfectly with your business processes.',
    features: [
      'Salesforce Implementation',
      'Custom Development (Apex, LWC)',
      'Third-party Integrations',
      'Data Migration',
      'Sales & Service Cloud Setup',
      'Ongoing Support & Training',
    ],
    technologies: ['Salesforce', 'Apex', 'Lightning Web Components', 'SOQL', 'MuleSoft', 'Data Loader'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]
