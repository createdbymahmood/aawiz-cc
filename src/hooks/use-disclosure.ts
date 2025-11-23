import {useState} from 'react'

export const useDisclosure = (initialValue: boolean = false) => {
  const [isOpen, setOpen] = useState(initialValue)
  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const toggle = () => setOpen((v: boolean) => !v)
  return {
    isOpen,
    open,
    close,
    setOpen,
    toggle,
  }
}
