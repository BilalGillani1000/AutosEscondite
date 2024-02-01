import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/form.jpg"
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate=useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password
      };
      const response=await axios.post("http://localhost:4000/user/signin", userData);
      if(! response.data.message){
        alert("Incorrect Username or Password");
      }else if(response.data.message === "ip") {
        alert("Incorrect Password");
      }else if(response.data.message === "verified" && response.data.token){
        localStorage.setItem("token", response.data.token);
        alert("Signin Successfull");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
  <Navbar />
  <Container fluid className="p-0" style={{ backgroundImage: `url(${img})`, backgroundSize: 'contain', maxHeight: '500px' }}>
    <Row className="justify-content-center" style={{ minHeight: '100vh' }}>
      <Col md={6}>
        <Form onSubmit={handleSignin} className='mt-5 text-white'>
          <h1 className="text-center mb-4">Sign In</h1>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </Form.Group>
          <Button className='mt-4' variant="primary" type="submit" block>
            Sign In
          </Button>
        </Form>
        <Link className='formlink' to="/signup">Don't have an account? Sign Up</Link>
      </Col>
    </Row>
  </Container>
  <Footer />
</div>
  );
};

export default SignIn;