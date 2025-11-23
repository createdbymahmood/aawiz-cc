import type {Metadata} from 'next'

import {HomePage} from '@/components/home'

export const metadata: Metadata = {
  title: 'Home',
  /* Write down some dummy meta data */
  description: 'Home page',
  keywords: [
    'home',
    'page',
    'dummy',
    'meta',
    'data',
    'next.js',
    'react',
    'shadcn',
    'ui',
    'tailwind',
    'typescript',
  ],
  authors: [
    {name: 'Mahmood Bagheri', url: 'https://github.com/createdbymahmood'},
  ],
  openGraph: {
    title: 'Home',
    description: 'Home page',
    url: 'https://example.com',
  },
}

export default HomePage
