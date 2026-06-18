# FYNRYX Web Platform: Project & Technology Report

This document outlines the architecture, technology stack, third-party integrations, and deployment strategy used to build the FYNRYX web application.

## 1. Technology Stack

The application is built using a modern, performance-oriented frontend stack to ensure blazing fast load times and a premium user experience.

*   **Framework:** React 18
*   **Language:** TypeScript (for type safety and scalable code)
*   **Build Tool:** Vite (for rapid development and optimized production builds)
*   **Routing:** React Router v6
*   **Styling:** Tailwind CSS (for highly customizable, utility-first styling)
*   **Animations:** Framer Motion (used for advanced micro-interactions and smooth page transitions)
*   **Icons:** Lucide React
*   **SEO Management:** React Helmet Async (with dynamic meta tags, canonical URLs, and Open Graph data injected dynamically)

## 2. Core Features & Services

### Contact System
*   **Technology:** Custom React Form (`FormData` with `no-cors` fetch implementation)
*   **Integration:** Zoho Flow Webhook
*   **Workflow:** Submissions are intercepted, structured as `multipart/form-data`, and posted directly to a Zoho Flow incoming Webhook endpoint.

### Careers & Job Applications
*   **Technology:** Zoho Forms
*   **Integration:** Embedded iFrame integration
*   **Workflow:** Complex data collection (including file/resume uploads) is handled securely via an embedded Zoho Form on the `JobDetailsPage`, providing a seamless UX without needing custom backend file storage.

## 3. Zoho Ecosystem Integration

To minimize backend server maintenance while maximizing automation, the application heavily leverages the Zoho ecosystem as its "No-Code Backend".

*   **Zoho Forms:** Used for rendering complex forms (Job Applications) that require file attachments.
*   **Zoho Flow (Webhooks):** Acts as the intermediary API. It listens for incoming `POST` requests from the website's Contact Form.
*   **Zoho Sheets (Database):** Acts as the primary database.
    *   *Contact Submissions:* Zoho Flow automatically maps the incoming webhook data to columns in a Zoho Sheet.
    *   *Job Applications:* Zoho Forms natively integrates with Zoho Sheet to log all applicant data and resume links.
*   **Zoho Mail / Automated Responses:** 
    *   Zoho Flow is configured to trigger a "Send Email" action upon every successful form submission.
    *   It dynamically pulls the user's `Email` field and sends a branded, professional auto-reply confirming receipt of their message/application.

## 4. Hosting and Deployment

The application is hosted on **Vercel**, optimized for frontend frameworks like React and Vite.

*   **Platform:** Vercel
*   **CI/CD Pipeline:** Continuous Integration/Continuous Deployment is configured via Vercel's GitHub/Git integration.
*   **Build Process:** Pushing code to the `main` branch automatically triggers Vercel to run `npm run build`. Vercel then distributes the compiled static assets (`dist` folder) across its global Edge Network (CDN).
*   **Performance:** Vercel ensures maximum uptime, automatic HTTPS/SSL provisioning, and instant cache invalidation for the fastest possible content delivery.
