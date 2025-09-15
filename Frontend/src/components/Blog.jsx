import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../axiosintercepter';
import { Link } from 'react-router-dom'

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios.get('/api/blog')
      .then((res) => {
        setBlogs(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const deleteBlog=(id)=>{

    axiosInstance.delete('/blog/delete/'+id)
    .then((res)=>{
      window.location.reload();
    }
  )
    .catch((err)=>{
      console.err(err)
    })    
}
  const navigate = useNavigate();
  const updateBlog=(blog)=>{
    navigate('/addblog',{state:{blog}})
  }
  const learnMore = (blog)=>{
    navigate('/learnmore',{state:{blog}})
  }

  const token = localStorage.getItem("token")
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {blogs.map((blog) => (
        <Card sx={{ maxWidth: 345, margin: '15px' }} key={blog._id}>
          <CardMedia
            sx={{ height: 340 }}
            image={blog.image}
            title={blog.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {blog.description}
            </Typography>
          </CardContent>
          <CardActions>
            {
              token && (
                <>
                <Button size="small" onClick={()=>{updateBlog(blog)}}>Update</Button>
            <Button size="small" onClick={()=>{deleteBlog(blog._id)}}>Delete</Button>
            </>
              )
            }
            <Link to={`/learnmore/${blog._id}`}><Button size="small" onClick={()=>{learnMore(blog)}}>Learn More</Button></Link>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default Blog
