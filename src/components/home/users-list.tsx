'use client'

import React from 'react'

import {useGetUsersSuspense} from '@/data-provider/api/users'

export const UsersList = () => {
  const {data: users} = useGetUsersSuspense()
  return <pre>{JSON.stringify(users, null, 2)}</pre>
}
