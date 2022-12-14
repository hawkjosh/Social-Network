import React, { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import logo2 from '../assets/images/logo-2.png'

export default function Register() {

  const [formData, setFormData] = useState({ username: '', email: '', password: '', github: '' })

  const [register, { error, data }] = useMutation(ADD_USER)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

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
    <figure className='min-h-screen flex bg-gray-600'>
      <img className='object-scale-down' src={logo2} alt='SIT Logo' />

      <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default px-1'>
        <div className='text-primary m-6'>
          <div className='flex items-center mt-3 justify-center'>
            <h1 className='text-2xl font-medium text-primary mt-4 mb-2'>Register for an account</h1>
          </div>

          {Auth.loggedIn() ? (<Navigate to='/dashboard' />) : (
          // {data ? (<Navigate to='/dashboard' />) : (
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
              />

              <label>Email:</label>
              <input
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
              />

              <label>Password:</label>
              <input
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
              />

              <label>GitHub:</label>
              <input
                name='github'
                type='text'
                value={formData.github}
                onChange={handleChange}
                placeholder='GitHub (optional)'
                className='w-full p-2 text-primary border border-gray-600 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
              />

              <div className='flex items-center mt-3 justify-center'>
                <button type='submit' className='bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black'>Register</button>
              </div>
            </form>
          )}

          {error && (
            <div className='text-xl font-bold text-red-700 text-center uppercase mt-6 mb-2'>
              Username, email, password, and/or github is invalid.
              {/* {error.message} */}
            </div>
          )}

        </div>
      </div>
    </figure>
  )
}