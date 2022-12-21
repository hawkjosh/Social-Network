import React from 'react'

import { useQuery } from '@apollo/client'

import PostsList from './PostsList'

import { QUERY_POSTS } from '../utils/queries'

export default function Home() {

  const { loading, data } = useQuery(QUERY_POSTS)

  const posts = data?.posts || []

  return (
    <div className='bg-zinc-700 flex justify-center items-start min-h-screen'>
      <div className='flex flex-col justify-center items-center mt-5 w-9/12'>
        <div className='my-4'>
          <input className='px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder='Search' aria-label='Search' />
          <button className='px-6 py-2 border-2 bg-sky-500 border-sky-600 font-semibold text-sm leading-tight text-white uppercase rounded hover:bg-sky-400 hover:bg-opacity-2 focus:outline-none focus:ring-0 focus:bg-sky-600 transition duration-150 ease-in-out ml-3 h-12 material-symbols-outlined' type='button'>Search</button>
        </div>
        <div className='flex justify-center items-end m-3'>
          {loading ? (<div>Loading...</div>) : (<PostsList posts={posts} />)}
        </div>
      </div>
    </div>
  )
}