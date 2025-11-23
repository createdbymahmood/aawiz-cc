'use client'

import '@/styles/globals.css'

import {isServer, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental'
import {capitalize} from 'lodash-es'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import * as React from 'react'
import {toast} from 'sonner'

import {AppLayout} from '@/components/shared/layout/app-layout'
import {NProgress} from '@/components/ui/nprogress'
import {Toaster} from '@/components/ui/sonner'
import {toClientErrorMessage} from '@/lib/to-client-error-message'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60 * 1000,
      },
      mutations: {
        onError: (error) => {
          void toast.error(capitalize(toClientErrorMessage(error)))
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

function ReactQueryProviders({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
export interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders = React.memo(({children}: AppProvidersProps) => {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='light'
      disableTransitionOnChange
    >
      <React.Suspense>
        <NuqsAdapter>
          <NProgress />
          <Toaster />
          <ReactQueryProviders>
            <AppLayout>{children}</AppLayout>
          </ReactQueryProviders>
        </NuqsAdapter>
      </React.Suspense>
    </NextThemesProvider>
  )
})
