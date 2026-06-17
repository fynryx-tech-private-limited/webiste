import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  href?: string
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 shadow-md shadow-primary-500/20',
  secondary:
    'bg-primary-700 text-white hover:bg-primary-800 shadow-md shadow-primary-700/20',
  outline:
    'border-2 border-white/80 text-white hover:bg-white hover:text-primary-800',
  ghost: 'text-primary-600 hover:bg-primary-50',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs uppercase tracking-wider',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-sm uppercase tracking-wider',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500'
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
