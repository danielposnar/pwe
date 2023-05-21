import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signUpRoute } from "../utils/APIRoutes";


function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "", passwordAgain: ""});

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
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

  const handleValidation = () => {
    const { username, password, passwordAgain } = values;
    if (password !== passwordAgain) {
      toast.error(
        "Passwords are not matching.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 5) {
      toast.error(
        "Password should be greater than 5 characters.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password, passwordAgain } = values;
      const { data } = await axios.post(signUpRoute, {
        username,
        password,
      });
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }else{
        toast.error(data.msg, toastOptions);
      }     
    }
  };


  return (
    <>
    <Form onSubmit={handleSubmit}>
        <Row xs lg="2" className="justify-content-md-center">
        <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" name="username" onChange={handleChange}/>
      </Form.Group>
        </Row>
        <Row xs lg="2" className="justify-content-md-center"> 
        <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
      </Form.Group>
        </Row>
        <Row xs lg="2" className="justify-content-md-center">
        <Form.Group className="mb-3">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control type="password" placeholder="Password again" name="passwordAgain" onChange={handleChange}/>
      </Form.Group> 
        </Row>
        <Row xs lg="2" className="justify-content-md-center">
            <Col>
                <Button variant="primary" type="submit">
                    Sign up
                </Button>{' '}
                <Link to="/login">
                <Button variant="secondary" className="justify-content-md-left">
                    Already have an account (Login)
                </Button>{' '} 
                </Link>                         
            </Col>
        </Row>     
    </Form>
    <ToastContainer />
    </>   
  )
}

export default SignUp