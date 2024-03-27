import React from 'react'

import { useState,useEffect } from 'react'
import axios from 'axios';
import Newidea from '../components/Newidea';
import Ideas from '../components/ideas';
import { useNavigate} from 'react-router-dom'
function Home() {
  const [user,setUser]=useState()
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("/api/logedin",{withCredentials: true})
    .then((res)=>setUser(res.data))
    .catch((err)=>console.log(err))
   
},[])
  const handellogout=(e)=>{
    e.preventDefault
    axios.post('/api/logout',{},{withCredentials: true})
    navigate('/')
  }
  return (
    <>
      {
        user?
        <div className=' px-2 xl:px-32 mt-10 container mx-auto ' >
            <div className='flex justify-between items-center text-xl font-bold mb-10'>
              <p>Hi {user.alias}</p>
              <button onClick={handellogout}>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" className='w-10 h-10 ' alt="" />
              </button>
            </div>
        <div className='container mx-auto w-96'>
          <Newidea />
        </div>
          <Ideas userid={user._id}/>
      </div>
      :null

      }
    </>
    
  )
}

export default Home