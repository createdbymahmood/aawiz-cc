import type {ComponentPropsWithoutRef} from 'react'

import React from 'react'

import {SmoothReveal} from '@/components/ui/smooth-reveal'

interface SectionProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({children, ...props}) => {
  return <SmoothReveal {...props}>{children}</SmoothReveal>
}
