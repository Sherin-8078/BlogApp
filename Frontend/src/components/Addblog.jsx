import React, { useEffect, useState,  } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';
import axiosInstance from '../axiosintercepter';
const Add = () => {
    const[blog,setBlog]=useState({
      title:"",
      description:"",
      image:"",
      moreinfo:""
    })
  const handleChange=(e)=>{
    setBlog({...blog,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(location.state!=null){
        axiosInstance.put('/blog/update/'+location.state.blog._id,blog)
        .then((res)=>{
          setBlog({
        title:"",
        description:"",
        image:"",
        moreinfo:""
      })
          navigate('/')
        })
        .catch((err)=>{
          console.error(err)
        })
    }else{
      axiosInstance.post('/blog/add',blog)
      .then((res)=>{
      setBlog({
        title:"",
        description:"",
        image:"",
        moreinfo:""
      })
      navigate('/')
    })
    .catch((err)=>{
      console.error(err)
    })
    }
  }
  
  let location = useLocation();//to track current location 
  const navigate = useNavigate(); 
  useEffect(()=>{
    if(location.state!=null){
      setBlog({...blog,
        title:location.state.blog.title,
        description:location.state.blog.description,
        image:location.state.blog.image,
        moreinfo:location.state.blog.moreinfo

      })

    }
  },[])
  return (
    <div style={{textAlign:'center',marginTop:'200px',}}>
        <h1>{location.state ? "Update Blog": "Add Blog"}</h1>
       <form onSubmit={handleSubmit}>
         <TextField id="outlined-basic" label="Blog-title" variant="outlined" name='title' value={blog.title} onChange={handleChange} required/><br /><br />
         <TextField id="outlined-basic" label="Blog-description" variant="outlined" name='description' value={blog.description} onChange={handleChange} required/><br /><br />
         <TextField id="outlined-basic" label="Blog-image_URL" variant="outlined" name='image' value={blog.image} onChange={handleChange}required/><br /><br />
         <TextField id="outlined-basic" label="Blog-info" variant="outlined" name='moreinfo' value={blog.moreinfo} onChange={handleChange} required/><br /><br />

      <Button variant="contained" type='submit' >Submit</Button>
       </form>
      </div>
  )
}

export default Add