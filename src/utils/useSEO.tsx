import { Helmet } from 'react-helmet-async'



export interface PageSEOProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
}

export function SEO(seo: PageSEOProps) {
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta property="og:type" content={seo.ogType || 'website'} />
      
      {/* Twitter Tags */}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
    </Helmet>
  )
}
