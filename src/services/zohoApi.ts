import Papa from 'papaparse'
import { jobOpenings as mockJobOpenings } from '../data/careers'
import type { JobOpening } from '../data/careers'

// The public CSV export link from Zoho Sheets
// Set this in your .env file as VITE_ZOHO_SHEET_CSV_URL
const ZOHO_SHEET_CSV_URL = import.meta.env.VITE_ZOHO_SHEET_CSV_URL || 'https://sheet.zohopublic.in/sheet/publishedsheet/e258f7166c76213f8fc943c18273a64d26ee8c8fa3188856df1ef584bc1dd1bb?type=grid&download=csv'

export async function fetchJobOpenings(): Promise<JobOpening[]> {
  if (!ZOHO_SHEET_CSV_URL) {
    console.warn("Zoho Sheet CSV URL not configured. Using fallback mock data.")
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobOpenings), 600)
    })
  }

  try {
    let fetchUrl = ZOHO_SHEET_CSV_URL
    
    // In local development, use Vite's proxy to bypass CORS
    if (import.meta.env.DEV && ZOHO_SHEET_CSV_URL.includes('sheet.zohopublic.in')) {
      try {
        const urlObj = new URL(ZOHO_SHEET_CSV_URL)
        fetchUrl = `/api/zoho${urlObj.pathname}${urlObj.search}`
      } catch {
        // Fallback to original URL if URL parsing fails
      }
    } else if (!import.meta.env.DEV) {
      // In production (Vercel), use the serverless function we created at /api/zoho
      fetchUrl = '/api/zoho'
    }

    const response = await fetch(fetchUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    
    // Parse the CSV text into an array of objects
    const results = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (results.errors.length > 0) {
      console.error("Errors parsing CSV:", results.errors)
    }

    const jobs: JobOpening[] = (results.data as Record<string, string>[]).map((row) => {
      return {
        id: String(row.id || Math.random().toString(36).substr(2, 9)),
        title: row.title || 'Untitled Position',
        department: row.department || 'General',
        location: row.location || 'Remote',
        type: row.type || 'Full-time',
        shortDescription: row.shortDescription || 'Read more for details.',
        // Split paragraphs by | symbol
        description: row.description ? row.description.split('|').map((s: string) => s.trim()).filter(Boolean) : [],
        // Split bullet points by | symbol
        requirements: row.requirements ? row.requirements.split('|').map((s: string) => s.trim()).filter(Boolean) : [],
        benefits: row.benefits ? row.benefits.split('|').map((s: string) => s.trim()).filter(Boolean) : []
      }
    })

    return jobs
  } catch (error) {
    console.error("Error fetching jobs from Zoho Sheets:", error)
    return mockJobOpenings
  }
}

export async function fetchJobDetails(jobId: string): Promise<JobOpening | undefined> {
  const jobs = await fetchJobOpenings()
  return jobs.find((j) => String(j.id) === String(jobId))
}
