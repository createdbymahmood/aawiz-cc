'use client'
import {cubicBezier, motion, useAnimation} from 'framer-motion'
import React, {useEffect} from 'react'
import {useInView} from 'react-intersection-observer'

interface SmoothRevealProps {
  children: React.ReactNode
  direction?: 'down' | 'left' | 'right' | 'up'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export const SmoothReveal: React.FC<SmoothRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 100,
  className = '',
  once = true,
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [controls, inView, once])

  const getDirectionalProps = () => {
    switch (direction) {
      case 'down':
        return {y: -distance}
      case 'left':
        return {x: distance}
      case 'right':
        return {x: -distance}
      case 'up':
      default:
        return {y: distance}
    }
  }

  const customEasing = cubicBezier(0.2, 0.0, 0.0, 1.0)

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionalProps(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: customEasing,
        delay,
      },
    },
  }

  return (
    <motion.div
      animate={controls}
      className={className}
      initial='hidden'
      ref={ref}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
