import React from 'react'

import Logout from './Logout'

import Auth from '../utils/auth'

export default function Navbar() {

  return (
      <nav style={{ backgroundColor: 'rgb(39 39 42)', position: 'sticky', top: '0px' }}>
        <ul style={{ display: 'flex', alignItems: 'center', color: 'rgb(74 222 128)' }}>
          <li style={{ marginLeft: '2rem', fontWeight: '100' }}>
            {Auth.loggedIn() ? (
              <a href='/home'>Home</a>
              ) : (<div />)
            }
          </li>
          <li style={{ marginLeft: '2rem', fontWeight: '100' }}>
            {Auth.loggedIn() ? (
              <a href='/new-post'>New Post</a>
              ) : (<div />)
            }
          </li>
          <li style={{ marginLeft: '2rem', fontWeight: '100' }}>
            {Auth.loggedIn() ? (
              <a href='/users'>Users</a>
              ) : (<div />)
            }
          </li>
          <li style={{ marginLeft: '2rem', fontWeight: '100' }}>
            {Auth.loggedIn() ? (
              <a href='/user-posts'>Your Posts</a>
              ) : (<div />)
            }
          </li>
          <li style={{ marginLeft: '2rem', fontWeight: '100' }}>
            {Auth.loggedIn() ? <Logout /> : <div />}
          </li>
        </ul>
      </nav>
    )
  }