import React from 'react'

export default function UsersList({ users }) {

  if (!users.length) {
    return <h3>No Users Yet</h3>
  }

  function comingSoon() {
    alert('Functionality coming soon...')
  }
    
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-wrap justify-evenly items-center mt-4 mb-16'>
        {users && users.map((user, userId) => (
          <div key={userId} onClick={comingSoon} className='text-center bg-gray-800 rounded-xl border border-zinc-200 py-3 px-6 m-3 w-1/2 hover:bg-gray-700 cursor-pointer'>
            <div className='text-2xl text-zinc-200 mb-2'>{user.username}</div>
            <div className='text-lg text-green-400 mb-1 italic hover:text-green-500'>{user.email}</div>
            <div className='text-sm text-green-400 font-semibold hover:text-green-500'>{user.github}</div>
          </div>
        ))}
      </div>
    </div>
  )
}