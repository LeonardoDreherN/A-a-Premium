import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { damping: 30, stiffness: 500, mass: 0.4 })
  const dotY = useSpring(y, { damping: 30, stiffness: 500, mass: 0.4 })
  const ringX = useSpring(x, { damping: 22, stiffness: 130, mass: 0.9 })
  const ringY = useSpring(y, { damping: 22, stiffness: 130, mass: 0.9 })

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, input, textarea, select, [data-cursor="hover"]'))
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2.5 w-2.5 rounded-full bg-lime-300 mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-lime-300/70 mix-blend-difference"
        animate={{
          width: hovering ? 68 : 34,
          height: hovering ? 68 : 34,
          opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
