import { useEffect, useState } from 'react'
import { BRAND_TAGLINE } from '../../data/brand'

interface PreloaderProps {
  onFinish: () => void
}

const MIN_DISPLAY_MS = 1100
const EXIT_MS = 550

export function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const start = performance.now()
    const loadDuration = reducedMotion ? 400 : 1300

    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(94, (elapsed / loadDuration) * 94)
      setProgress(next)
      if (elapsed < loadDuration) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    const waitForLoad = () =>
      new Promise<void>((resolve) => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', () => resolve(), { once: true })
      })

    const finish = async () => {
      await Promise.all([waitForLoad(), new Promise((r) => setTimeout(r, MIN_DISPLAY_MS))])

      setProgress(100)
      await new Promise((r) => setTimeout(r, reducedMotion ? 80 : 220))

      setExiting(true)
      await new Promise((r) => setTimeout(r, reducedMotion ? 150 : EXIT_MS))
      onFinish()
    }

    finish()

    return () => cancelAnimationFrame(raf)
  }, [onFinish])

  return (
    <div
      className={`preloader-screen ${exiting ? 'preloader-screen-exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Fynryx website"
    >
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <img src="/logo.png" alt="Fynryx" className="preloader-logo" />
        </div>

        <p className="brand-tagline mt-6 text-primary-600">{BRAND_TAGLINE}</p>

        <div className="preloader-bar-track mt-10">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-xs font-medium tabular-nums text-primary-500">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
