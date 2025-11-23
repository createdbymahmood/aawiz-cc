'use client'

import React from 'react'

import {ServiceRequestDialogButtonWrapper} from '@/components/service-request/service-request-dialog'
import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <ServiceRequestDialogButtonWrapper>
      <Button>Form With Validation</Button>
    </ServiceRequestDialogButtonWrapper>
  )
}
