import React from 'react'

export default function PostList({ posts }) {

	if(!posts.length) {
		return <h2>No Posts Yet</h2>
	}

	return (
		<div className='flex flex-col justify-center items-center mb-16'>
			<h2 className='font-medium text-5xl leading-relaxed text-green-400'>
				Check out the post feed!
			</h2>
			<div className='flex flex-wrap justify-around items-center'>
				{posts && posts.map((post, postId) => (
					<div key={postId} className='m-3 bg-zinc-200 rounded-lg w-fit'>
						<div className='p-2 bg-zinc-800 text-green-400 font-normal text-xl flex flex-col justify-center items-center rounded-t-lg'>
							{post.postAuthor}
							<div className='text-white text-xs'>
								{post.createdAt}
							</div>
						</div>
						<div className='m-3 text-zinc-800'>
							{post.postText}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}