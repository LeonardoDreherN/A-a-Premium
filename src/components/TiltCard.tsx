import { useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  radius = 'rounded-3xl',
}: {
  children: ReactNode
  className?: string
  radius?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 220, damping: 20 })
  const glareBackground = useTransform([px, py], (v) => {
    const [gx, gy] = v as number[]
    return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(198,255,61,0.18), transparent 60%)`
  })

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative will-change-transform ${radius} ${className}`}
    >
      {children}
      <motion.div
        className={`pointer-events-none absolute inset-0 ${radius}`}
        style={{ background: glareBackground, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </motion.div>
  )
}
