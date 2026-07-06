import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  children: ReactNode
  disabled?: boolean
  strength?: number
}

export default function MagneticButton({
  href,
  type = 'button',
  onClick,
  className,
  children,
  disabled,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 })

  function handleMouseMove(e: ReactMouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    'data-cursor': 'hover' as const,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.94 },
    style: { x: springX, y: springY },
    className,
  }

  if (href) {
    return (
      <motion.a ref={ref} href={href} {...sharedProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref} type={type} onClick={onClick} disabled={disabled} {...sharedProps}>
      {children}
    </motion.button>
  )
}
