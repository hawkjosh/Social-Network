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
    <figure className='h-screen flex bg-gray-600'>
      <img className='object-scale-down' src={logo2} alt='SIT Logo' />

      <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1'>
        <div className='text-primary m-6'>
          <div className='flex items-center mt-3 justify-center'>
            <h1 className='text-2xl font-medium text-primary mt-4 mb-2'>Login to your account</h1>
          </div>

          {Auth.loggedIn() ? (<Navigate to='/home' />) : (
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
                />

              <label>Password:</label>
              <input
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
                />

              <div className='flex items-center mt-3 justify-center'>
                <button type='submit' className='bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black'>Login</button>
              </div>
            </form>
          )}

          {error && (
            <div className='text-xl font-bold text-red-700 uppercase mt-6 mb-2'>
              Incorrect username or password
            </div>
          )}

          <div className='flex items-center mt-3 justify-center'>
            <button className='justify-center text-blue-500 hover:underline'>
              <Link to='/register'>Need to register?</Link>
            </button>
          </div>
        </div>
      </div>
    </figure>
  )
}