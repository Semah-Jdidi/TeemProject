import React from 'react'
import Signup from '../components/signup'
import Login from '../components/Login'
function Login_signup() {
  return (
    <div className=' xl:px-32 mt-10 container mx-auto ' >
        <p className='text-2xl text-gray-700 font-bold'>Welcome !</p>
        <div className='flex justify-between'>
            <Signup />
            <Login />
        </div>
     </div>
  )
}

export default Login_signup