import React from 'react'

export default function PostList({ posts }) {

	if(!posts.length) {
		return <h2>No Posts Yet</h2>
	}

	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
			<h2 style={{fontFamily: `'Kanit', sans-serif`, fontWeight: '400', fontSize: '3rem', color: '#34D399'}}>
				Check out the post feed!
			</h2>
			<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', borderRadius: '10%'}}>
				{posts && posts.map((post) => (
					<div key={post._id} className='card m-2.5 bg-zinc-200' style={{borderRadius: '10%', width: 'fit-content'}}>
						<h4 style={{ fontWeight: '400', fontSize: '20px' }} className='p-2 m-0 bg-zinc-800 text-green-400 flex flex-col justify-center items-center'>
							{post.postAuthor}
							<span style={{ fontSize: '50%', color: 'white' }}>
								{post.createdAt}
							</span>
						</h4>
						<div style={{textAlign: 'center'}}>
							<div className='m-3 text-zinc-800'>{post.postText}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}