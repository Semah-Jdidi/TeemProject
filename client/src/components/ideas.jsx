import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
function Ideas(props) {
    const {userid,ideas,setIdeas,removeidea}=props
    console.log(userid)
    useEffect(()=>{
        axios.get("/api/allideas")
        .then((res)=>setIdeas(res.data))
        .catch((err)=>console.log(err))
    },[])
    const handellike=(postid)=>{
        axios.patch("/api/like/",{userid,postid})
        .then(res => {
            // Update the likes count in the ideas state
            setIdeas(prevIdeas => {
                return prevIdeas.map(idea => {
                    if (idea._id === postid) {
                        return { ...idea, likesCount: idea.likesCount + 1 }; 
                    }
                    return idea;
                });
            });
        })
        .catch(err => console.log(err))
    }
    const deleteidea=(id)=>{
        axios.delete("/api/deleteidea/"+id)
        .then(removeidea(id))
        .catch(err => console.log(err))
        console.log(id)
      }
  return (
    <>
        {ideas?
        <div>
            {
        ideas.map((idea,index)=>(
            <div key={index} className='m-10'>
                <div className='flex gap-8 items-center'>
                    <Link to={'/author/'+idea.author}>
                        <p className='text-lg w-28'>{idea.name} : Says</p>
                    </Link>
                    <div className=' rounded-t-2xl rounded-br-2xl border-2 border-[#000000] w-96 max-h-36 overflow-y-auto break-words p-3 shadow-xl overflow-hidden'>
                        <p className='text-md'>{idea.content}</p>
                    </div>
                    {
                        idea.author == userid?
                        <button onClick={(e)=>deleteidea(idea._id)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAYFBMVEX///8AAADi4uKVlZXY2NjT09P6+vpAQECLi4udnZ3Nzc00NDRISEj09PSxsbHn5+fGxsZycnK8vLxlZWUgICCAgIDu7u5PT08REREICAgpKSmoqKh4eHhdXV1WVlZsbGwKcEhYAAAC9klEQVR4nO3c2bKiMBQFUJlBBAwyOCD+/1+21qXtJNdEk6AHq/d+lQqrMGLm1QpBEAT5YIpwbZqwoEZPicuhz03TD2VMDb/FZ3vPJnvmU9Ov+N7KfktPzo+ZNd7zGHXliRzwnhcR63dO+h2x/uCkPxDrnfCeR4uPHfW0P1vooYceekr9MQt0yY6L1m+eXL+Bfr446j9iVOa7nz30hFlyva/K7EkkzfGkvfokv++fFV9WtvS4zj365LVV7SpaaviU1mbYLaVW35Oa40u7EbJ3ZF+a4osLtZnLxbTubJfwi/2bfGuoL6nFQkyrzpfr3QbJ5s3BVL9OqMlcEuPR2oGazGUwxa+2DbX5nsb0lXON3ACjS2aOXw7fCr9aRS6zOnOF2c+vdCF1ljKtiyAI8nK67pOvrqLrZiysDgbWZuv5StRmnbVsCOqZHlfIfhpseWo9NGSQKv3pkzYOf7Jcon893PP7+dX5frd8Br7Pt5R37679Bb9qo3FfvyOOqNUzCHWphbu1rsUVYosvmYOoidQfdf2qt9685enTSXez6FQJkbso711K5kt3s+yY3BOQ6gPH8qB/PdDzgf71QM/HSF/4oa9rmXfXz7V/d4T6omzHTX/JVE3DKLv0m7EtNX46fXWe5umSx/cMpjbMXtPOJtN33ETXoylKbgI1V9YuKn0srED4PdchzCRtVNPfVPqTML07yk+3G/mP96dl6QtxuLmRezG1OJfBFL9cIn0o7d+Qm7ZSQ7sPF6WPpE5RKtbsWFr0oJpGgx566KGHHnrooYceeuihhx566KGHHnrooYceeuihhx566KGHHnrooYceeuihhx566KGH/iv1/ihe9mQt7KgqhkYfi0e+PFuHPCgWgVOtAS8F3q+drMLOU69RneZDtnuAf/gPjowRDrRRnodDpq+4p/vo0XLbB3aL2/tw2xA+HTXVP95CXE+L3A+a7emEe37iKBuThNUqXFWzJBmzSHNqIe1usfga+4+p9a6Bng/0r+f/0v8B1LlJ9vlMkCUAAAAASUVORK5CYII=" className='w-6 h-6' alt="" /></button>
                        :null
                    }
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
        :null
    }
        
    </>
  )
}

export default Ideas