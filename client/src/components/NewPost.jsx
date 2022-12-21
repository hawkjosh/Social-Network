import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { ADD_POST } from '../utils/mutations'

import { QUERY_POSTS } from '../utils/queries'

import Auth from '../utils/auth'

export default function NewPost() {

	const [postText, setPostText] = useState('')

	const [addPost, { error }] = useMutation(ADD_POST, {
		update(cache, { data: { addPost } }) {
			try {
				const { posts } = cache.readQuery({ query: QUERY_POSTS })
				cache.writeQuery({
					query: QUERY_POSTS,
					data: { posts: [addPost, ...posts] }
				})
			}
			catch (e) {
				console.error(e)
			}
		}
	})

	const navigate = useNavigate()

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		navigate('/home')

		try {
			await addPost({
				variables: {
					postText,
					postAuthor: Auth.getProfile().data.username
				}
			})
			setPostText('')
		}

		catch (err) {
			console.error(err)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'postText' && value.length <= 280) {
			setPostText(value)
		}
	}

	return (
		<div className='min-h-screen flex'>
			<div className='bg-zinc-700 flex-grow'>
				<div className='mx-auto bg-zinc-800 rounded-xl shadow border p-8 sm-m-10 m-10 w-11/12'>
					<h1 className='text-2xl font-normal text-green-400'>
						New Post
					</h1>

					{Auth.loggedIn() ? (
						<form className='mt-8' onSubmit={handleFormSubmit}>
							<div className='grid grid-cols-1 gap-6 h-auto'>
								<textarea
									name='postText'
									type='text'
									rows='6'
									value={postText}
									placeholder='Type your post here'
									onChange={handleChange}
									className='mt-1 py-1 px-3 flex w-full rounded-md bg-gray-100 border-transparent font-extralight focus:border-gray-500 focus:bg-white focus:ring-0 focus:outline-none h-40'
								/>
							</div>
							<div className='grid grid-cols-1 gap-6'>
								<button type='submit' className='bg-sky-500 font-extralight rounded-md text-white justify-self-center hover:bg-sky-400 active:bg-sky-600 focus:bg-sky-600 focus:outline-none m-4 w-24 sm-w-40 h-10'>Add Post</button>
							</div>
						</form>
					) : (
						<p>
							You need to be logged in!
							Please{' '}<Link to='/login'>login</Link> or{' '}<Link to='/register'>register.</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}