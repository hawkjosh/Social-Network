import React from 'react'

export default function PostList({ posts }) {

	const boldKanit = {
		fontFamily: `'Kanit', sans-serif`,
		fontWeight: '400',
		fontSize: '20px'
	}

	const normalKanit = {
		fontFamily: `'Kanit', sans-serif`
	}

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
						<h4 style={boldKanit} className='p-2 m-0 bg-zinc-800 text-green-400 flex flex-col justify-center items-center'>
							{post.postAuthor}
							<span style={{ fontSize: '50%', color: 'white' }}>
								{post.createdAt}
							</span>
						</h4>
						<div style={{textAlign: 'center'}}>
							<div className='m-3 text-zinc-800' style={normalKanit}>{post.postText}</div>
							<button type='submit' class='inline-block px-6 py-2.5 mt-3 bg-sky-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-400 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
								Add Friend
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}