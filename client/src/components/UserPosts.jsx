import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import UserPostsUtil from '../utils/UserPostsUtil'
import { QUERY_CURRUSER, QUERY_USER } from '../utils/queries'
import Auth from '../utils/auth'


export default function UserPosts() {

	const { username: userParam } = useParams()

	const { loading, data } = useQuery(
		userParam ? QUERY_USER : QUERY_CURRUSER, {
		variables: { username: userParam }
	}
	)

	const user = data?.currUser || data?.user || {}

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to='/user-posts' />
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (!user?.username) {
		return <div>These are not your posts!</div>
	}

	return (
		<div className='min-h-screen bg-gray-600 mb-10'>
			<div className='flex flex-col justify-center items-center mx-auto p-8 w-9/12'>

				<UserPostsUtil posts={user.posts} />

				<button className='flex justify-center font-semibold text-gray-800 bg-green-400 rounded-md hover:text-white hover:bg-green-500 active:bg-green-500 mt-5 w-3/12'>
					<Link to='/new-post'>
						NEW POST
					</Link>
				</button>
			</div>
		</div>
	)
}