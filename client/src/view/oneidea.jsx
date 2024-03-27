import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Likes from '../components/likes';
function Oneidea() {
    const {id}=useParams();
    const [idea,setIdea]=useState([])
  useEffect(()=>{
      axios.get("/api/idea/"+id)
      .then((res)=>setIdea(res.data.idea))
      .catch((err)=>console.log(err))
  },[])
  return (
    <div className=' px-2 xl:px-32 mt-10 container mx-auto ' >
    <div className='flex gap-8 items-center'>
        <Link to={'/author/'+idea.author}>
            <p className='text-lg'>{idea.name} : Says</p>
        </Link>
        <div className=' rounded-t-2xl rounded-br-2xl border-2 border-[#000000] w-96 max-h-36 overflow-y-auto break-words p-3 shadow-xl overflow-hidden'>
            <p className='text-md'>{idea.content}</p>
        </div>  
    </div>
    <p className='mt-10 text-2xl'>People how liked this post</p>
    <Likes />
</div>

        
    
  )
}

export default Oneidea