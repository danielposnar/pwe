import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Write username", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Write password", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try{
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
  
          navigate("/");
        }
      }catch(err){
        toast.error("Incorrect Username or Password", toastOptions);
      }
    }
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
        <Row xs lg="2" className="justify-content-md-center">
        <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" name="username" min="3" onChange={handleChange}/>
      </Form.Group>
        </Row>
        <Row xs lg="2" className="justify-content-md-center"> 
        <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" min="8" onChange={handleChange} />
      </Form.Group>
        </Row>
        <Row xs lg="2" className="justify-content-md-center">
            <Col>
                <Button variant="primary" type="submit">
                    Login
                </Button>{' '}
                <Link to="/signup">
                <Button variant="secondary" className="justify-content-md-left">
                I don't have an account (Sign up)
                </Button>{' '} 
                </Link>               
            </Col>
        </Row>        
    </Form>
    <ToastContainer />
    </>   
  )
}

export default Login