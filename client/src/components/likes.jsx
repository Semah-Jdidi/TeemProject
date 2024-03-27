import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Likes() {
    const {id}=useParams();
    const [users,setUsers]=useState([])
  useEffect(()=>{
      axios.get("/api/idea/"+id)
      .then((res)=>setUsers(res.data.users))
      .catch((err)=>console.log(err))
  },[])
  return (
    <div>
        <table className="mt-4 mb-4 w-full min-w-max table-auto text-left">
        <thead >
            <tr className='text-center'>
                <th>Alias</th>
                <th>Name</th> 
            </tr>
        </thead>
        <tbody>
        {
            users.map((user,index)=>(
                <tr key={index} className='className="cursor-pointer border-y  border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"'>
                    <td className='py-2 px-8'>
                        <Link to={"/author/"+ user._id} >
                            <p>{user.alias}</p>
                        </Link>
                    </td>
                    <td className='py-2 px-8'>{user.name}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
    </div>
  )
}

export default Likes