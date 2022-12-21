import React from 'react'

import CatAvatar from '../assets/images/cat-avatar.png'
import EricAvatar from '../assets/images/eric-avatar.png'
import JoshAvatar from '../assets/images/josh-avatar.png'
import KimberlyAvatar from '../assets/images/kimberly-avatar.png'

export default function Footer() {

  const footerContainer = {
		height: '4rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: 'rgb(39 39 42)',
    position: 'fixed',
    bottom: 0,
    width: '100%'
	}

	const avatar = {
    aspectRatio: '1/1',
		width: '3.5rem',
		marginRight: '2rem',
    marginLeft: '2rem'
	}

	return (
		<div style={footerContainer}>
			<a href='https://github.com/catcueto' target='_blank' rel='noreferrer'>
				<img style={avatar} src={CatAvatar} alt='Catalina Avatar'/>
			</a>
			<a href='https://github.com/ericwittenstein' target='_blank' rel='noreferrer'>
				<img style={avatar} src={EricAvatar} alt='Eric Avatar'/>
			</a>
			<a href='https://github.com/hawkjosh' target='_blank' rel='noreferrer'>
				<img style={avatar} src={JoshAvatar} alt='Josh Avatar'/>
			</a>
			<a href='https://github.com/howardk97' target='_blank' rel='noreferrer'>
				<img style={avatar} src={KimberlyAvatar} alt='Kimberly Avatar'/>
			</a>
		</div>
	)
}