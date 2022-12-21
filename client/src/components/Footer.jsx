import React from 'react'

import CatAvatar from '../assets/images/cat-avatar.png'
import EricAvatar from '../assets/images/eric-avatar.png'
import JoshAvatar from '../assets/images/josh-avatar.png'
import KimberlyAvatar from '../assets/images/kimberly-avatar.png'

export default function Footer() {

	return (
		<div className='h-16 flex justify-center items-center bg-zinc-800 fixed bottom-0 w-full'>
			<a href='https://github.com/catcueto' target='_blank' rel='noreferrer'>
				<img className='aspect-square w-14 mx-8' src={CatAvatar} alt='Catalina Avatar'/>
			</a>
			<a href='https://github.com/ericwittenstein' target='_blank' rel='noreferrer'>
				<img className='aspect-square w-14 mx-8' src={EricAvatar} alt='Eric Avatar'/>
			</a>
			<a href='https://github.com/hawkjosh' target='_blank' rel='noreferrer'>
				<img className='aspect-square w-14 mx-8' src={JoshAvatar} alt='Josh Avatar'/>
			</a>
			<a href='https://github.com/howardk97' target='_blank' rel='noreferrer'>
				<img className='aspect-square w-14 mx-8' src={KimberlyAvatar} alt='Kimberly Avatar'/>
			</a>
		</div>
	)
}