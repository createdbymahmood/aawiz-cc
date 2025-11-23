'use client'

import React from 'react'

import {useGetTodosSuspense} from '@/data-provider/api/todos'

export default function Home() {
  const {data} = useGetTodosSuspense()
  return <pre className='text-xs'>{JSON.stringify(data, null, 2)}</pre>
}
