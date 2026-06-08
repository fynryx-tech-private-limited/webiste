import { useEffect, useRef, type ReactNode } from 'react'

const PRIMARY = '15, 118, 110'
const SECONDARY = '20, 184, 166'

const ORBIT_INNER = 36
const ORBIT_OUTER = 145
const GLOW_SPRING = 0.14
const VISIBILITY_DECAY = 0.055
const VISIBILITY_BOOST = 0.45
const IDLE_HIDE_MS = 180

interface OrbitalDot {
  angle: number
  orbitRadius: number
  orbitSpeed: number
  wobblePhase: number
  wobbleAmp: number
  radius: number
  baseOpacity: number
  color: 'primary' | 'secondary'
  glow: boolean
  x: number
  y: number
}

interface PointerState {
  x: number
  y: number
  active: boolean
}

function isLowPerformanceDevice() {
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency ?? 4
  return coarse || cores <= 4 || window.innerWidth < 768
}

function getDotCount(lowPerf: boolean) {
  return lowPerf ? 48 : 96
}

function createOrbitalDots(count: number): OrbitalDot[] {
  const rings = 5
  const perRing = Math.ceil(count / rings)
  const dots: OrbitalDot[] = []

  for (let ring = 0; ring < rings; ring++) {
    const t = ring / (rings - 1)
    const orbitRadius = ORBIT_INNER + t * (ORBIT_OUTER - ORBIT_INNER)

    for (let i = 0; i < perRing; i++) {
      if (dots.length >= count) break

      dots.push({
        angle: (i / perRing) * Math.PI * 2 + ring * 0.4,
        orbitRadius: orbitRadius + (Math.random() - 0.5) * 10,
        orbitSpeed: (0.0009 + ring * 0.00025) * (Math.random() > 0.5 ? 1 : -1),
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: 2 + Math.random() * 4,
        radius: 1 + Math.random() * 1.5,
        baseOpacity: 0.18 + Math.random() * 0.22,
        color: Math.random() > 0.4 ? 'primary' : 'secondary',
        glow: Math.random() < 0.1,
        x: 0,
        y: 0,
      })
    }
  }

  return dots
}

function updateOrbitalDots(
  dots: OrbitalDot[],
  smoothPointer: PointerState,
  time: number,
  delta: number,
) {
  for (const dot of dots) {
    dot.angle += dot.orbitSpeed * delta

    const wobbleX = Math.sin(time * 0.0018 + dot.wobblePhase) * dot.wobbleAmp
    const wobbleY = Math.cos(time * 0.0015 + dot.wobblePhase) * dot.wobbleAmp

    dot.x = smoothPointer.x + Math.cos(dot.angle) * dot.orbitRadius + wobbleX
    dot.y = smoothPointer.y + Math.sin(dot.angle) * dot.orbitRadius + wobbleY
  }
}

function drawOrbitalDots(
  ctx: CanvasRenderingContext2D,
  dots: OrbitalDot[],
  visibility: number,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height)

  if (visibility < 0.02) return

  for (const dot of dots) {
    const rgb = dot.color === 'primary' ? PRIMARY : SECONDARY
    const opacity = Math.min(dot.baseOpacity * visibility, 0.42)

    ctx.beginPath()
    ctx.fillStyle = `rgba(${rgb}, ${opacity})`

    if (dot.glow) {
      ctx.shadowBlur = 10
      ctx.shadowColor = `rgba(${SECONDARY}, ${0.5 * visibility})`
    }

    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

interface AboutParticleBackgroundProps {
  children: ReactNode
}

export function AboutParticleBackground({ children }: AboutParticleBackgroundProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<OrbitalDot[]>([])
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false })
  const smoothPointerRef = useRef<PointerState>({ x: 0, y: 0, active: false })
  const visibilityRef = useRef(0)
  const lastMoveTimeRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const rafRef = useRef(0)
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPerf = isLowPerformanceDevice()

    const resize = () => {
      const { width, height } = section.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      sizeRef.current = { width, height, dpr }

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dotsRef.current = createOrbitalDots(getDotCount(lowPerf))
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)

    const setPointer = (clientX: number, clientY: number, time: number) => {
      const bounds = section.getBoundingClientRect()
      const x = clientX - bounds.left
      const y = clientY - bounds.top

      pointerRef.current = { x, y, active: true }
      lastMoveTimeRef.current = time
      visibilityRef.current = Math.min(1, visibilityRef.current + VISIBILITY_BOOST)

      if (visibilityRef.current < 0.25) {
        smoothPointerRef.current = { x, y, active: true }
      }
    }

    const onMouseMove = (event: MouseEvent) => {
      setPointer(event.clientX, event.clientY, performance.now())
    }

    const onMouseLeave = () => {
      pointerRef.current.active = false
      visibilityRef.current = 0
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) setPointer(touch.clientX, touch.clientY, performance.now())
    }

    const onTouchEnd = () => {
      pointerRef.current.active = false
      visibilityRef.current = 0
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd)
    section.addEventListener('touchcancel', onTouchEnd)

    const animate = (time: number) => {
      const { width, height } = sizeRef.current
      const dots = dotsRef.current
      const pointer = pointerRef.current
      const smoothPointer = smoothPointerRef.current
      const delta = lastFrameTimeRef.current ? time - lastFrameTimeRef.current : 16
      lastFrameTimeRef.current = time

      if (!reducedMotion && width > 0 && height > 0) {
        const movedRecently = time - lastMoveTimeRef.current < IDLE_HIDE_MS

        if (pointer.active && movedRecently) {
          smoothPointer.x += (pointer.x - smoothPointer.x) * GLOW_SPRING
          smoothPointer.y += (pointer.y - smoothPointer.y) * GLOW_SPRING
          smoothPointer.active = true
          visibilityRef.current = Math.min(1, visibilityRef.current + VISIBILITY_BOOST * 0.35)
        } else {
          smoothPointer.active = false
          visibilityRef.current = Math.max(0, visibilityRef.current - VISIBILITY_DECAY)
        }

        if (visibilityRef.current > 0.02 && smoothPointer.active) {
          updateOrbitalDots(dots, smoothPointer, time, delta)
        }

        drawOrbitalDots(ctx, dots, visibilityRef.current, width, height)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      section.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </section>
  )
}
