'use client'

import './nprogress-styles.css'

import {usePathname} from 'next/navigation'
import OriginalNProgress from 'nprogress'
import {useEffect} from 'react'

OriginalNProgress.configure({showSpinner: true})

export function NProgress() {
  const pathname = usePathname()

  useEffect(() => {
    OriginalNProgress.done()
  }, [pathname])

  return null
}

export {OriginalNProgress}
