import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {
    const [form,setForm]=useState({
            email:'',
            password:'',
           })
    const navigate = useNavigate()
    function capValue(e){
        e.preventDefault()
        axios.post('/api/user/login',form)
        .then((res)=>{
            alert(res.data.message)
            if(res.data.userToken){
              localStorage.setItem("token",res.data.userToken)
                navigate('/')
            }
        })
        .catch((err)=>{
            console.error(err)
            alert("Invalid credentials or server error")
            navigate('/login')
        })
    }
  return (
    
    
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
      noValidate
      autoComplete="off"
    >
        
    <div style={{textAlign:'center',marginTop:200}}>
        <div><h1>Login</h1></div>
        <div><TextField
              required
              id="outlined-required"
              label="E-mail"
              value={form.email}
              onChange={(e)=>
            {setForm({...form,email:e.target.value})
        }
          }
             
            /></div>,
    <div><TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
               value={form.password}
              onChange={(e)=>{
                setForm({...form,password:e.target.value})
              }
            
          }
            />

    </div>,
    <div>
        <Button variant="contained" onClick={capValue} type='submit'>Login</Button>
    </div>
    </div>
    </Box>
  )
}

export default Login