import {Suspense} from 'react'

import Pending from '@/app/loading'
import {ServiceRequestDialogButtonWrapper} from '@/components/service-request/service-request-dialog'
import {Button} from '@/components/ui/button'

import {UsersList} from './users-list'

export const HomePage = () => {
  return (
    <div className='flex flex-col gap-5 items-start'>
      <ServiceRequestDialogButtonWrapper>
        <Button>Form With Validation</Button>
      </ServiceRequestDialogButtonWrapper>

      <Suspense fallback={<Pending />}>
        <UsersList />
      </Suspense>
    </div>
  )
}
