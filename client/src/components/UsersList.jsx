import React from 'react'

export default function UsersList({ users, title }) {

  if (!users.length) {
    return <h3>No Users Yet</h3>
  }

  return (
    <div>
      <h3 style={{fontWeight: '400', fontSize: '20px'}} className='text-green-400'>{title}</h3>
      <div style={{fontWeight: '300'}} className='flex flex-wrap justify-around my-4 space-x-3 w-72'>
        {users &&
          users.map((user) => (
            <div key={user._id} className='card-header bg-dark text-white p-2 m-1'>
              {/* <div className='card mb-3'> */}
                {/* <h4 className='card-header bg-dark text-green-400 p-2 m-0'> */}
                  {user.username}
                {/* </h4> */}
              {/* </div> */}
            </div>
          ))}
      </div>
    </div>
  )
}