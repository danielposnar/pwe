import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Chat from './pages/Chat'

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path = "/signup" element ={<SignUp/>} />
    <Route path = "/login" element ={<Login/>} />
    <Route path = "/" element ={<Chat/>} />
  </Routes>
  </BrowserRouter>
}
