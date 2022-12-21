import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PostListUtil from '../utils/ProfileListUtil';
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

	// target current logged in user posts
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
		<div className='min-h-screen flex'>
			<div className='bg-zinc-700 flex-grow'>
				<div className='container mx-auto p-8 sm-m-10 w-75'>
					<h2 style={{ fontWeight: '400', fontSize: '20px' }} className='text-sky-500 p-1'>
						Viewing Your Posts
					</h2>

					<PostListUtil posts={user.posts} />

					<div className='flex justify-center bg-zinc-800 rounded-lg shadow border hover:bg-sky-400 active:bg-green-500'>
						<Link className='text-white' to='/new-post'>
							CLICK HERE TO ADD A NEW POST
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
