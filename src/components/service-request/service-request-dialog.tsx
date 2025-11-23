'use client'

import type {JSX} from 'react'

import {parseAsBoolean, useQueryState} from 'nuqs'
import React, {Suspense} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'
import {withSuspense} from '@/lib/with-suspense'

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

function ServiceRequestDialogImpl() {
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
          sm:w-lg
          w-full
          !max-w-full
          overscroll-contain
          overflow-auto
          rounded-none sm:rounded-lg
          `,
        )}
      >
        <DialogHeader>
          <DialogTitle>Submit Your Request</DialogTitle>
          <DialogDescription>
            Please fill out the form below to submit your request.
          </DialogDescription>
        </DialogHeader>

        <ServiceRequest />
      </DialogContent>
    </Dialog>
  )
}
export const ServiceRequestDialog = withSuspense(ServiceRequestDialogImpl, null)
