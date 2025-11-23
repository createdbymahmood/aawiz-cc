'use client'

import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'
import {useEffect, useState} from 'react'

import {Skeleton} from '@/components/ui/skeleton'
import {Toggle} from '@/components/ui/toggle'

export function ThemeSwitch() {
  const {setTheme, theme} = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className='size-[36px]' />
  }

  return (
    <Toggle
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className='group size-9 border-none'
      pressed={theme === 'dark'}
      variant='outline'
      onPressedChange={() =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
      }
    >
      {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
      <Moon
        size={16}
        aria-hidden='true'
        className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
        strokeWidth={2}
      />
      <Sun
        size={16}
        aria-hidden='true'
        className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
        strokeWidth={2}
      />
    </Toggle>
  )
}
