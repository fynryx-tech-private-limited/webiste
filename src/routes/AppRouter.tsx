import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { ServicesPage } from '../pages/ServicesPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { ContactPage } from '../pages/ContactPage'
import { LegalPage } from '../pages/LegalPage'
import { NotFoundPage } from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'privacy-policy',
        element: (
          <LegalPage
            title="Privacy Policy"
            sections={[
              {
                heading: 'Information We Collect',
                content:
                  'We collect information you provide directly, such as your name, email address, and phone number when you contact us or request a quote. We may also collect usage data to improve our services.',
              },
              {
                heading: 'How We Use Your Information',
                content:
                  'Your information is used to respond to inquiries, provide IT services, send updates about our offerings, and improve our website experience. We do not sell your personal data to third parties.',
              },
              {
                heading: 'Data Security',
                content:
                  'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
              },
            ]}
          />
        ),
      },
      {
        path: 'refund-policy',
        element: (
          <LegalPage
            title="Refund Policy"
            sections={[
              {
                heading: 'Refund Eligibility',
                content:
                  'Refunds may be requested within 14 days of service purchase if the service has not been substantially delivered. Custom development projects are evaluated on a case-by-case basis.',
              },
              {
                heading: 'How to Request a Refund',
                content:
                  'Contact our support team at info@fynryx.com with your order details and reason for the refund request. We will review and respond within 5 business days.',
              },
              {
                heading: 'Processing Time',
                content:
                  'Approved refunds are processed within 7-10 business days and returned to the original payment method.',
              },
            ]}
          />
        ),
      },
      {
        path: 'terms',
        element: (
          <LegalPage
            title="Terms & Conditions"
            sections={[
              {
                heading: 'Acceptance of Terms',
                content:
                  'By accessing and using the Fynryx website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
              },
              {
                heading: 'Services',
                content:
                  'Fynryx provides IT services including web development, mobile applications, SEO, and managed IT support. Service scope and deliverables are defined in individual project agreements.',
              },
              {
                heading: 'Limitation of Liability',
                content:
                  'Fynryx shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services, except as required by applicable law.',
              },
            ]}
          />
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
