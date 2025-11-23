'use client'

import React from 'react'

import type {User} from '@/data-provider/api/api.generated.schemas'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {useGetUsersSuspense} from '@/data-provider/api/users'

interface UsersListCardProps {
  user: User
}
const UsersListCard: React.FC<UsersListCardProps> = ({user}) => {
  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className='whitespace-pre-wrap'>
          {JSON.stringify(user, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}

export const UsersList = () => {
  const {data: users} = useGetUsersSuspense()

  const content = (() => {
    if (!users.length) {
      return <div>No users found</div>
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
        {users.map((user) => (
          <UsersListCard key={user.id} user={user} />
        ))}
      </div>
    )
  })()

  return content
}
