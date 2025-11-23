import type {ComponentPropsWithoutRef, ReactNode} from 'react'

import {forwardRef} from 'react'

import {cn} from '@/lib/utils'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({className, ...props}, ref) => {
    return (
      <div
        className={cn('container max-w-screen-xl overflow-visible', className)}
        id='container'
        ref={ref}
        {...props}
      />
    )
  },
)
