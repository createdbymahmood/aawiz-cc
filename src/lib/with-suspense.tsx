import {Suspense} from 'react'

import {Pending} from '@/components/shared/pending'

export const withSuspense = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
) => {
  return (props: T) => {
    return (
      <Suspense fallback={<Pending />}>
        <Component {...props} />
      </Suspense>
    )
  }
}
