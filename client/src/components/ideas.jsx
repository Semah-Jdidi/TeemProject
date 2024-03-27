import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
function Ideas(props) {
    const {userid}=props
    const [ideas,setIdeas]=useState([])
    useEffect(()=>{
        axios.get("/api/allideas")
        .then((res)=>setIdeas(res.data))
        .catch((err)=>console.log(err))
    },[])
    const handellike=(postid)=>{
        axios.patch("/api/like/",{userid,postid})
        .then(res=>console.log(res))
    }
  return (
    <div>
        {
        ideas.map((idea,index)=>(
            <div key={index} className='m-10'>
                <div className='flex gap-8 items-center'>
                    <Link to={'/author/'+idea.author}>
                        <p className='text-lg'>{idea.name} : Says</p>
                    </Link>
                    <div className=' rounded-t-2xl rounded-br-2xl border-2 border-[#000000] w-96 max-h-36 overflow-y-auto break-words p-3 shadow-xl overflow-hidden'>
                        <p className='text-md'>{idea.content}</p>
                    </div>
                    
                </div>
                <div className='flex items-center gap-2 px-16 w-96 mt-3'>
                    <button onClick={(e)=>handellike(idea._id)}><img src="https://cdn-icons-png.flaticon.com/512/105/105220.png" className='w-4 h-4' alt="" /></button>
                    <Link to={"/idea/"+idea._id}>
                        <p>{idea.likesCount} people like this</p>
                    </Link>
                
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Ideas