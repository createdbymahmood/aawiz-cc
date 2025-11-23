'use client'

import {MonitorIcon, MoonIcon, Paintbrush, SunIcon} from 'lucide-react'
import {useTheme} from 'next-themes'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const ThemeSwitch = () => {
  const {setTheme} = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' aria-label='Select theme' variant='outline'>
          <Paintbrush />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='min-w-32' side='bottom'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon size={16} aria-hidden='true' className='opacity-60' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon size={16} aria-hidden='true' className='opacity-60' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <MonitorIcon size={16} aria-hidden='true' className='opacity-60' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
