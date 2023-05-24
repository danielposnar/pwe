import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './components/Logout';

export default function App() {
  return <BrowserRouter>
  <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Chat app</Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Logout/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <Routes>
    <Route path = "/signup" element ={<SignUp/>} />
    <Route path = "/login" element ={<Login/>} />
    <Route path = "/" element ={<Chat/>} />
  </Routes>
  </BrowserRouter>
}
