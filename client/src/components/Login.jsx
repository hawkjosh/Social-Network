import React, { useState } from 'react'

import { Link, Navigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import logo2 from '../assets/images/logo-2.png'

export default function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' })

  const [login, { error }] = useMutation(LOGIN_USER)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await login({ variables: { ...formData } })
      Auth.login(data.login.token)
    }

    catch (err) {
      console.error(err)
    }

    setFormData({ email: '', password: '' })
  }

  return (
    <figure className='login-page-container'>
      <img style={{objectFit: 'scale-down'}} src={logo2} alt='SIT Logo' />

      <div className='login-form-container'>
        <div style={{margin: '1.5rem'}}>
          <div className='login-form-title-container'>
            <h1 className='login-form-title'>Login to your account</h1>
          </div>

          {Auth.loggedIn() ? (<Navigate to='/home' />) : (
            <form onSubmit={handleSubmit}>
              <label style={{textAlign: 'left'}}>Email:</label>
              <input
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='login-form-email-input'
                />

              <label>Password:</label>
              <input
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='login-form-password-input'
                />

              <div className='login-btn-container'>
                <button type='submit' className='login-btn'>Login</button>
              </div>
            </form>
          )}

          {error && (
            <div className='login-submit-error'>
              Incorrect username or password
            </div>
          )}

          <div className='register-link-container'>
            <button className='register-link'>
              <Link to='/register'>Need to register?</Link>
            </button>
          </div>
        </div>
      </div>
    </figure>
  )
}