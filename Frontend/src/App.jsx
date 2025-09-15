import React from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Addblog from './components/Addblog'
import { Route,Routes } from 'react-router-dom'
import Blog from './components/Blog'
import PrivateRoutes from './components/PrivateRoutes'
import LearnMore from './components/LearnMore'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/login' element= {<Login/>}></Route>
        <Route element={<PrivateRoutes/>} >
          <Route path='/addblog' element= {<Addblog/>}>
          </Route></Route>
        <Route path='/' element= {<Blog/>}></Route>
        <Route path='/learnmore/:id' element= {<LearnMore/>}></Route>

      </Routes>
    </div>
  )
}

export default App