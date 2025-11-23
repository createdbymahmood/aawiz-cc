'use client'

import {isString} from 'lodash-es'
import NextLink from 'next/link'
import {usePathname} from 'next/navigation'
import {useTransition} from 'react'

import {OriginalNProgress} from '@/components/ui/nprogress'
import {cn} from '@/lib/utils'

type LinkProps = React.ComponentProps<typeof NextLink> & {
  withNProgress?: boolean
}

const dropAllSlashes = (path?: string) => {
  if (!isString(path)) return path
  return path.replaceAll('/', '')
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  withNProgress = true,
  ...props
}) => {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  return (
    <NextLink
      className={cn(className)}
      href={href}
      {...props}
      onClick={(e) => {
        if (props.onClick) props.onClick(e)
        if (dropAllSlashes(href as string) === dropAllSlashes(pathname)) return

        if (withNProgress) {
          OriginalNProgress.start()
        }

        // Start navigation (App Router handles this)
        startTransition(() => {
          /*  */
        })
      }}
    >
      {children}
    </NextLink>
  )
}
