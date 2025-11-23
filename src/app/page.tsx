'use client'

import React from 'react'

import {ServiceRequestDialogButtonWrapper} from '@/components/service-request/service-request-dialog'
import {ThemeSwitch} from '@/components/shared/theme-switch'
import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex flex-row gap-2'>
      <ThemeSwitch />

    <ServiceRequestDialogButtonWrapper>
      <Button>Form With Validation</Button>
    </ServiceRequestDialogButtonWrapper>
    </div>
  )
}
