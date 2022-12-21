import React from 'react'

import { useMutation } from '@apollo/client'

import { DELETE_POST } from './mutations'

export default function UserPostsUtil({ posts }) {

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
		return <h3>You don't have any posts yet...</h3>
	}

	return (
		<div>
			{posts &&
				posts.map((post) => (
					<div key={post._id} className='mb-3 bg-zinc-200'>
						<div className='p-2 bg-zinc-800 text-green-400 text-xs'>
							You posted this on {post.createdAt}
						</div>
						<div className='inline-flex items-center m-3.5 text-zinc-800'>
							<div>{post.postText}</div>
							<button
								type='button'
								name={post._id}
								onClick={handleDelete}
								className='w-max ml-6 px-3 py-1 text-white bg-green-400 border-2 border-sky-500 rounded hover:border-green-400 hover:bg-sky-500'
								>
									Delete
							</button>
						</div>
					</div>
				))}
		</div>
	)
}