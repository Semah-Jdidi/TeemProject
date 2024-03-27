import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function Newidea() {

    const [content,setContent]=useState()

    const [errs,setErr]=useState("")

    const  saveidea = (e)=>{
        e.preventDefault();
        axios.post("/api/idea/create",{content},{withCredentials:true})
        .then(res=>{
          console.log(res)
          
        })
        .catch(err=>{setErr(err.response.data.errors)})
    }
  return (
    <div>
        <form onSubmit={saveidea} className='flex gap-5'>
            <input type="text" className='border-2 border-[#000000] focus:outline-none  rounded-t-2xl rounded-br-2xl w-96 p-2 shadow-lg shadow-[#000000]' 
            placeholder='post somthing here'
            onChange={(e)=>{setContent(e.target.value)}} />
            <button type='submit'>
                <img src="https://cdn-icons-png.flaticon.com/512/3430/3430793.png" className='w-10 h-10' alt="" />
            </button>
          
        </form>

    </div>
  )
}

export default Newidea