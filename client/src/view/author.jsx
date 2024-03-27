import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom"
function Author() {
  const {id}=useParams();
    const [user,setUser]=useState([])
    const navigate = useNavigate()
  useEffect(()=>{
      axios.get("/api/userinfo/"+id)
      .then((res)=>setUser(res.data))
      .catch((err)=>console.log(err))
  },[])
  const handellogout=(e)=>{
    e.preventDefault
    axios.post('/api/logout',{},{withCredentials: true})
    navigate('/')
  }
  return (
    <div className='text-xl flex flex-col gap-10 px-2 xl:px-32 mt-10 container mx-auto ' >
      <div className='flex justify-between items-center text-xl font-bold mb-10'>
              <Link to={"/ideas"}>ideas</Link>
              <button onClick={handellogout}>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" className='w-10 h-10 ' alt="" />
              </button>
      </div>
      {
        user.user?
          <>
            <p>Name : {user.user.name}</p>
            <p>Alias : {user.user.alias}</p>
            <p>Email : {user.user.email}</p>
          </>:null
      }
      
      <p>Total Number Of Posts : {user.posts}</p>
      <p>Total Number Of Likes : {user.likes}</p>
    </div>
  )
}

export default Author