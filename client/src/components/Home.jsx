import React from 'react'

import { useQuery } from '@apollo/client'

import PostsList from './PostsList'

import { QUERY_POSTS } from '../utils/queries'

export default function Home() {

  const { loading, data } = useQuery(QUERY_POSTS)

  const posts = data?.posts || []

  return (
    <div style={{ backgroundColor: 'rgb(63 63 70)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>

      <h1 className="text-3xl font-bold underline hover:text-lime-500">Hello world!</h1>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '75%', marginTop: '1.125rem'}}>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <input className='search-input' placeholder='Search' />
          <button className='search-btn' type='button'>search</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', margin: '0.75rem' }}>
          {loading ? (<div>Loading...</div>) : (<PostsList posts={posts} />)}
        </div>
      </div>
    </div>
  )
}