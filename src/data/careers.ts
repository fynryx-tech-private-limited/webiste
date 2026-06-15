export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
  shortDescription: string
  description: string[]
  requirements: string[]
  benefits: string[]
}

export const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'On-site',
    type: 'Full-time',
    shortDescription: 'We are looking for an experienced Frontend Engineer with deep knowledge of React and modern CSS frameworks.',
    description: [
      'As a Senior Frontend Engineer at Fynryx, you will be responsible for architecting and building the user interfaces for our core products.',
      'You will collaborate closely with designers, product managers, and backend engineers to deliver high-quality, scalable, and maintainable frontend solutions.',
      'You will also mentor junior engineers and contribute to our frontend engineering standards and best practices.'
    ],
    requirements: [
      '5+ years of experience building web applications using React.',
      'Strong proficiency in JavaScript/TypeScript, HTML, and CSS/SCSS.',
      'Experience with state management libraries (e.g., Redux, Zustand).',
      'Familiarity with modern frontend build pipelines and tools (e.g., Vite, Webpack).',
      'Experience with responsive design and cross-browser compatibility.',
      'Excellent problem-solving skills and attention to detail.'
    ],
    benefits: [
      'Competitive salary and equity package.',
      'Comprehensive health, dental, and vision insurance.',
      'Flexible working hours and remote work options.',
      'Generous paid time off and holidays.',
      'Professional development budget.'
    ]
  },
  {
    id: '2',
    title: 'INTERN',
    department: 'Engineering',
    location: 'On-site',
    type: 'Full-time',
    shortDescription: 'Join our team to gain hands-on experience and build stunning, user-centric applications.',
    description: [
      'As an Intern at Fynryx, you will get the opportunity to work on real-world projects and learn from experienced engineers.',
      'You will assist in developing and testing new features, fixing bugs, and improving our internal tools.',
      'This is a great opportunity to jumpstart your career in software engineering.'
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science, Software Engineering, or a related field.',
      'Basic understanding of web technologies (HTML, CSS, JavaScript).',
      'Familiarity with React is a plus.',
      'Strong eagerness to learn and grow.',
      'Good communication and teamwork skills.'
    ],
    benefits: [
      'Mentorship from experienced engineers.',
      'Hands-on experience with modern tech stacks.',
      'Opportunity for a full-time offer upon successful completion of the internship.',
      'Fun and collaborative work environment.'
    ]
  }
]
