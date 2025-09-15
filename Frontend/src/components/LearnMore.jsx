import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardMedia from '@mui/material/CardMedia';



const LearnMore = () => {
    const { id } = useParams();          // get the blog id from URL
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blog/${id}`)   // interpolate id
      .then((res) => {
        setBlogs(res.data);             // single blog, not array
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);
  return (
     <div  style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      textAlign: "center",
      
    }}>
      {blogs ? (
        <div>
          <h1 style={{fontSize:"50px",color:"blue",margin:"70px"}}>{blogs.title}</h1>
          <div >
             <CardMedia
        sx={{ height: 540 ,width : 1000,margin: "auto"}}
        image={blogs.image}
        title={blogs.title}
      />
          </div>
          <h3>{blogs.description}</h3>
         <div>
             <p style={{margin:"30px"}}>{blogs.moreinfo}</p>
        </div>
        </div>
        
      ) : (
        <p>Loading blog...</p>
      )}
    </div>
  )
}

export default LearnMore