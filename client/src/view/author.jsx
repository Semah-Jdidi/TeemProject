import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';

function Author() {
  const {id}=useParams();
    const [user,setUser]=useState([])
  useEffect(()=>{
      axios.get("/api/userinfo/"+id)
      .then((res)=>setUser(res.data))
      .catch((err)=>console.log(err))
  },[])
  return (
    <div className='text-xl flex flex-col gap-10 px-2 xl:px-32 mt-10 container mx-auto ' >
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