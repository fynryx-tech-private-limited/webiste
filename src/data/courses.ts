export interface Course {
  title: string
  description: string
  tag: string
  image: string
}

export const courses: Course[] = [
  {
    title: 'Data Science & AI',
    description: 'Master data analysis, machine learning, and AI tools to become a data-driven innovator.',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    title: 'Salesforce Development',
    description: 'Learn Salesforce CRM, Apex, and Lightning framework to build powerful business solutions.',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'Java Full Stack Development',
    description: 'Gain expertise in Java, Spring Boot, React, and databases to build complete web solutions.',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    title: 'Web Development',
    description: 'Become a full-stack web developer with HTML, CSS, JavaScript, React, and Node.js.',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    title: 'UI/UX Design',
    description: 'Learn to design stunning, user-centered interfaces using Figma and design principles.',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    title: 'Digital Marketing',
    description: 'Master SEO, social media, and ad campaigns to grow businesses in the digital era.',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    title: 'Software Testing (Manual + Automation)',
    description: 'Understand testing fundamentals, automation tools, and QA workflows for real-world projects.',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  },
  {
    title: 'Cyber Security',
    description: 'Learn ethical hacking, network defense, and threat analysis to secure digital systems.',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
]
