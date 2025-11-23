'use client'

import type {ToasterProps} from 'sonner'

import {
  AlertTriangle,
  CircleCheckIcon,
  Info,
  Loader,
  XCircleIcon,
} from 'lucide-react'
import {useTheme} from 'next-themes'
import {Toaster as Sonner} from 'sonner'

const Toaster = ({...props}: ToasterProps) => {
  const {theme = 'system'} = useTheme()

  return (
    <Sonner
      className='toaster group'
      theme={theme as ToasterProps['theme']}
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <Info className='size-4' />,
        warning: <AlertTriangle className='size-4' />,
        error: <XCircleIcon className='size-4 text-red-500' />,
        loading: <Loader className='size-4 animate-spin' />,
      }}
      position='top-center'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export {Toaster}
