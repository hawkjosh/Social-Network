import React from 'react'

import { useMutation } from '@apollo/client'

import { DELETE_POST } from './mutations'

export default function ProfileListUtil({ posts }) {

	const [removePost] = useMutation(DELETE_POST)

	const handleDelete = async (e) => {
		e.preventDefault()

		try {
			await removePost(e.target._id)
		}
		catch (error) {
			console.error(error)
		}
	}

	if (!posts.length) {
		return <h3>No posts yet</h3>
	}

	return (
		<div>
			{posts &&
				posts.map((post) => (
					<div key={post._id} className='card mb-3 bg-zinc-200'>
						<h4
							className='p-2 m-0 bg-zinc-800 text-green-400 flex justify-between'
							>
							<span style={{ fontSize: '75%' }}>
								You posted this on {post.createdAt}
							</span>
						</h4>
						<div className='inline-flex m-3 text-zinc-800'>
							<p>{post.postText}</p>
						</div>
						<button
							type='button'
							name={post._id}
							onClick={handleDelete}
							className='w-8 mx-3 mb-2 border border-black outline outline-2 rounded'
							>
							<span className='material-icons inline-flex'>
								delete
							</span>
						</button>
					</div>
				))}
		</div>
	)
}