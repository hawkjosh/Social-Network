import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import NewPost from './components/NewPost'
import Users from './components/Users.jsx'
import UserPosts from './components/UserPosts'

import './assets/styles/App.css'

const httpLink = createHttpLink({
	uri: 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
  })

export default function App() {

	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/dashboard' element={<Dashboard/>} />
					<Route path='/new-post' element={<NewPost />} />
					<Route path='/users' element={<Users />} />
					<Route path='/user-posts' element={<UserPosts />} />
				</Routes>
				<Footer />
			</Router>
		</ApolloProvider>
	)
}