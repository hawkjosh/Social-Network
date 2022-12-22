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

	function comingSoon() {
		alert('Functionality coming soon...')
	}
	
	return (
		<div className='w-9/12'>
			{posts &&
				posts.map((post) => (
					<div key={post._id} className='mb-3 bg-zinc-200 rounded-md'>
						<div className='py-2 pl-4 bg-gray-800 text-green-400 rounded-t-md text-sm'>
							You posted this on {post.createdAt}
						</div>
						<div className='flex justify-between items-center p-4 text-zinc-800'>
							<div className='text-lg'>{post.postText}</div>
							<button
								type='button'
								name={post._id}
								onClick={comingSoon}
								className='w-max ml-6 px-3 py-1 text-white bg-gray-800 rounded hover:text-green-500 hover:bg-gray-700'
								>
									Delete
							</button>
						</div>
					</div>
				))}
		</div>
	)
}