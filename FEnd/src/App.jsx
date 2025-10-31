import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard'
import Apply from './Pages/MyApplications'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/applied-jobs' element={ <Apply/>}/>

   </Routes>
  )
}

export default App