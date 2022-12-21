import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import UserPostsUtil from '../utils/UserPostsUtil';
import { QUERY_CURRUSER, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';


export default function UserPosts() {

	const { username: userParam } = useParams();

	const { loading, data } = useQuery(
		userParam ? QUERY_USER : QUERY_CURRUSER, {
		variables: { username: userParam }
	}
	);

	const user = data?.currUser || data?.user || {};

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to='/user-posts' />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return <div>These are not your posts!</div>;
	}

	return (
		<div className='min-h-screen flex mb-10'>
			<div className='bg-zinc-700 flex-grow'>
				<div className='mx-auto p-8 w-9/12'>
					<h2 className='text-sky-500 font-medium text-2xl p-1'>
						Viewing Your Posts
					</h2>

					<UserPostsUtil posts={user.posts} />

					<div className='flex justify-center bg-zinc-800 rounded-lg border hover:bg-sky-400 active:bg-green-500'>
						<Link className='text-white' to='/new-post'>
							CLICK HERE TO ADD A NEW POST
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}