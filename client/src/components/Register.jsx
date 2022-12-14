import React, { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import logo2 from '../assets/images/logo-2.png'

export default function Register() {

  const [formData, setFormData] = useState({ username: '', email: '', password: '', github: '' })

  const [register, { error }] = useMutation(ADD_USER)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await register({ variables: { ...formData }})
      Auth.login(data.addUser.token)
    }
    
    catch (err) {
      console.error(err)
    }

    setFormData({ username: '', email: '', password: '', github: '' })
  }

  return (
    <figure className='register-page-container'>
      <img style={{objectFit: 'scale-down'}} src={logo2} alt='SIT Logo' />

      <div className='register-form-container'>
        <div style={{margin: '1.5rem'}}>
          <div className='register-form-title-container'>
            <h1 className='register-form-title'>Register for an account</h1>
          </div>

          {Auth.loggedIn() ? (<Navigate to='/home' />) : (
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
                className='register-form-username-input'
              />

              <label>Email:</label>
              <input
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='register-form-email-input'
              />

              <label>Password:</label>
              <input
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='register-form-password-input'
              />

              <label>GitHub:</label>
              <input
                name='github'
                type='text'
                value={formData.github}
                onChange={handleChange}
                placeholder='GitHub (optional)'
                className='register-form-github-input'
              />

              <div className='register-btn-container'>
                <button type='submit' className='register-btn'>Register</button>
              </div>
            </form>
          )}

          {error && (
            <div className='register-submit-error'>
              Username, email, password, and/or github is invalid.
            </div>
          )}

        </div>
      </div>
    </figure>
  )
}