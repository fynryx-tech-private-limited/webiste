import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  onDark?: boolean
}

export function Logo({ className = '', onDark = false }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex shrink-0 ${className}`} aria-label="Fynryx home">
      <span
        className={`inline-flex items-center rounded-md ${
          onDark ? 'bg-white px-3 py-1.5' : ''
        }`}
      >
        <img
          src="/logo_backup_transparent.png"
          alt="Fynryx — Design   Innovate   Transform."
          className="h-9 w-auto sm:h-10"
        />
      </span>
    </Link>
  )
}
