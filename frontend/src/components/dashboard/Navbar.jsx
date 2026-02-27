import React from 'react'
import { useAuth } from '../../context//authContext'

 const Navbar = () => {
    const {user} = useAuth()
  return (
     <div className='flex items-center text-white font-bold justify-between h-12 bg-blue-500 px-5'>
        <p >Welcome {user.name} </p>
        <button className='px-4 py-1 bg-blue-800 hover:bg-blue-800'>Logout</button>
    </div>
  )
}

export default Navbar