import React from 'react'

import Logout from './Logout'

import Auth from '../utils/auth'

export default function Navbar() {

  return (
      <nav className='bg-zinc-800 sticky top-0'>
        <ul className='flex items-center text-green-400'>
          <li className='ml-8 font-thin'>
            {Auth.loggedIn() ? (
              <a href='/home'>Home</a>
              ) : (<div />)
            }
          </li>
          <li className='ml-8 font-thin'>
            {Auth.loggedIn() ? (
              <a href='/new-post'>New Post</a>
              ) : (<div />)
            }
          </li>
          <li className='ml-8 font-thin'>
            {Auth.loggedIn() ? (
              <a href='/users'>Users</a>
              ) : (<div />)
            }
          </li>
          <li className='ml-8 font-thin'>
            {Auth.loggedIn() ? (
              <a href='/user-posts'>Your Posts</a>
              ) : (<div />)
            }
          </li>
          <li className='ml-8 font-thin'>
            {Auth.loggedIn() ? <Logout /> : <div />}
          </li>
        </ul>
      </nav>
    )
  }