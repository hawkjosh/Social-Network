import React from 'react'

export default function UsersList({ users, title }) {

  if (!users.length) {
    return <h3>No Users Yet</h3>
  }

  return (
    <div className='min-h-screen'>
      <h3 className='text-2xl font-semibold text-green-400'>
        {title}
      </h3>
      <div className='flex flex-wrap justify-evenly my-4 w-max'>
        {users && users.map((user, userId) => (
          <div key={userId} className='font-medium bg-sky-400 rounded-md text-white py-2 px-6 my-2 mx-4'>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  )
}