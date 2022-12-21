import React, { useState } from 'react'

import { Link } from 'react-router-dom'

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

	const handleFormSubmit = async (e) => {
		e.preventDefault()

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
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<div style={{ flexGrow: 1, backgroundColor: 'rgb(63 63 70)' }}>
				<div style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2.5rem', backgroundColor: 'rgb(39 39 42)', borderRadius: '0.75rem', borderWidth: '1px', padding: '2rem' }}>
					<h1 style={{ fontWeight: '400', fontSize: '1.5rem', lineHeight: '2rem', color: 'rgb(74 222 128)' }}>
						New Post
					</h1>

					{Auth.loggedIn() ? (
						<form style={{ marginTop: '2rem' }} onSubmit={handleFormSubmit}>
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.5rem', height: 'auto' }}>
								<textarea
									name='postText'
									type='text'
									rows='6'
									value={postText}
									placeholder='Type your post here'
									onChange={handleChange}
									className='new-post-text'
								/>
							</div>
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.5rem' }}>
								<button type='submit' className='new-post-btn'>Add Post</button>
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