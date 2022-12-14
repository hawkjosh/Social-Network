import React from 'react'

import { useQuery } from '@apollo/client'

import UsersList from './UsersList'

import { QUERY_USERS } from '../utils/queries'

export default function Users() {

  const { loading, data } = useQuery(QUERY_USERS)
  const users = data?.users || []

  return (
    <main>
      <div className='min-h-screen flex justify-center bg-gray-600'>
        <div className='my-3'>
          {loading ? (<div>Loading...</div>) : (
            <UsersList
              users={users}
            />
          )}
        </div>
      </div>
    </main>
  )
}