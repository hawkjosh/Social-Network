import React from 'react'

import { useQuery } from '@apollo/client'

import PostsList from './PostsList'

import { QUERY_POSTS } from '../utils/queries'

export default function Dashboard() {

  const { loading, data } = useQuery(QUERY_POSTS)

  const posts = data?.posts || []

  return (
    <div className='bg-gray-600 flex justify-center items-start min-h-screen'>
      <div className='flex justify-center items-end m-3'>
        {loading ? (<div>Loading...</div>) : (<PostsList posts={posts} />)}
      </div>
    </div>
  )
}