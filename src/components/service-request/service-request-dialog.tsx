'use client'

import type {JSX} from 'react'

import {parseAsBoolean, useQueryState} from 'nuqs'
import React, {Suspense} from 'react'

import {Dialog, DialogContent} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'

import {ServiceRequest} from './service-request'

export const SERVICE_REQUEST_DIALOG_QUERY_STATE =
  '__service_request_dialog_open'
export const SERVICE_REQUEST_DIALOG_ROUTE = `?${SERVICE_REQUEST_DIALOG_QUERY_STATE}=true`

export const useServiceRequestDialogState = () => {
  const [isOpen, setIsOpen] = useQueryState(
    SERVICE_REQUEST_DIALOG_QUERY_STATE,
    parseAsBoolean.withDefault(false),
  )
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  return {isOpen, open, close}
}

interface ServiceRequestDialogButtonWrapperProps {
  children: JSX.Element
}

const Impl: React.FC<ServiceRequestDialogButtonWrapperProps> = ({children}) => {
  const {open} = useServiceRequestDialogState()

  // eslint-disable-next-line @eslint-react/no-clone-element
  return React.cloneElement(children, {onClick: open})
}

export const ServiceRequestDialogButtonWrapper: React.FC<
  ServiceRequestDialogButtonWrapperProps
> = (props) => {
  return (
    <Suspense fallback={props.children}>
      <Impl {...props} />
    </Suspense>
  )
}

export function ServiceRequestDialog() {
  const {isOpen, close} = useServiceRequestDialogState()
  return (
    <Dialog onOpenChange={close} open={isOpen}>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        onWheel={(e) => e.stopPropagation()}
        className={cn(
          `
          sm:w-[1139px]
          w-full
          md:max-h-[816px]
          h-full
          !max-w-full
          overscroll-contain
          pb-10
          backdrop-blur-sm
          bg-background/70
          px-0 lg:p-10 py-10
          overflow-auto
          rounded-none sm:rounded-lg
          `,
        )}
      >
        <div className='px-4'>
          <ServiceRequest />
        </div>
      </DialogContent>
    </Dialog>
  )
}
