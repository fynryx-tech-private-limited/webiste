import Papa from 'papaparse'
import { jobOpenings as mockJobOpenings } from '../data/careers'
import type { JobOpening } from '../data/careers'

// The public "Publish to Web" CSV link from Google Sheets
// Set this in your .env file as VITE_GOOGLE_SHEET_CSV_URL
const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || ''

export async function fetchJobOpenings(): Promise<JobOpening[]> {
  if (!GOOGLE_SHEET_CSV_URL) {
    console.warn("Google Sheet CSV URL not configured. Using fallback mock data.")
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobOpenings), 600)
    })
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL)
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

    const jobs: JobOpening[] = results.data.map((row: any) => {
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
    console.error("Error fetching jobs from Google Sheets:", error)
    return mockJobOpenings
  }
}

export async function fetchJobDetails(jobId: string): Promise<JobOpening | undefined> {
  const jobs = await fetchJobOpenings()
  return jobs.find((j) => String(j.id) === String(jobId))
}
