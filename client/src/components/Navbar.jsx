import React, { useEffect, useState } from 'react'

import Logout from './Logout'

import Auth from '../utils/auth'

export default function Navbar() {

  // set width of window to current window size
  const [width, setWidth] = useState(window.innerWidth)

  // resize based on current window size
  useEffect(() => {
    window.addEventListener('resize', updateWidth)
  })

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  // value to hold Navbar
  let currentNav

  // styling
  const navLinks = {
    marginLeft: '2rem',
    fontFamily: `'Kanit', sans-serif`,
    fontWeight: '100'
  }

  const navContainer = {
    display: 'flex',
    alignItems: 'center'
  }

  // for smaller screens
  if (width < 1000) {
    currentNav = (
      <div>
        <div className='' id='navbarToggleExternalContent'>
          <div className='p-4'>
            <nav className='bg-zinc-800 navbar fixed-top'>
              <div className='container-fluid'>
                <button
                  className='navbar-toggler hover:bg-green-300 bg-green-400 focus:bg-green-500'
                  type='button'
                  data-bs-toggle='offcanvas'
                  data-bs-target='#offcanvasNavbar'
                  aria-controls='offcanvasNavbar'
                  >
                  <span className='navbar-toggler-icon' />
                </button>
                <div className='offcanvas offcanvas-start' id='offcanvasNavbar'>
                  <div className='offcanvas-body bg-zinc-200'>
                    <ul className='navbar-nav justify-content-end flex-grow-1 pe-3 text-zinc-800'>
                      <li className='nav-item'>
                        {Auth.loggedIn() ? (
                          <a className='nav-link active' href='/home'>
                            <i className='nav-link active material-icons'>home</i>
                          </a>
                        ) : (
                          <div />
                        )}
                      </li>
                      <li className='nav-item'>
                        {Auth.loggedIn() ? (
                          <a className='nav-link active' href='/new-post'>New Post</a>
                        ) : (
                          <div />
                        )}
                      </li>
                      <li className='nav-item'>
                        {Auth.loggedIn() ? (
                          <a className='nav-link active' href='/users'>Users</a>
                        ) : (
                          <div />
                        )}
                      </li>
                      <li className='nav-item'>
                        {Auth.loggedIn() ? (
                          <a className='nav-link active' href='/your-posts'>Your Posts</a>
                        ) : (
                          <div />
                        )}
                      </li>
                      <li className='nav-item'>
                        {Auth.loggedIn() ? <Logout /> : <div />}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  // For bigger screens
  else {
    currentNav = (
      <nav className='nav bg-zinc-800 sticky top-0'>
        <ul
          style={navContainer}
          className='left hide-on-med-and-down text-green-400'
          >
          <li style={navLinks}>
            {Auth.loggedIn() ? (
              <a href='/home'>
                <i className='material-icons text-green-400'>home</i>
              </a>
            ) : (
              <div />
            )}
          </li>
          <li style={navLinks}>
            {Auth.loggedIn() ? (
              <a className='text-green-400' href='/new-post'>New Post</a>
            ) : (
              <div />
            )}
          </li>
          <li style={navLinks}>
            {Auth.loggedIn() ? (
              <a className='text-green-400' href='/users'>Users</a>
            ) : (
              <div />
            )}
          </li>
          <li style={navLinks}>
            {Auth.loggedIn() ? (
              <a className='text-green-400' href='/your-posts'>Your Posts</a>
            ) : (
              <div />
            )}
          </li>
          <li style={navLinks} className='text-green-400'>
            {Auth.loggedIn() ? <Logout /> : <div />}
          </li>
        </ul>
      </nav>
    )
  }

  return <div>{currentNav}</div>
}