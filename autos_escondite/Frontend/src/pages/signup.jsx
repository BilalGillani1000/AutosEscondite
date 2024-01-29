import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/form.jpg";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const navigate=useNavigate();

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === repass) {
      try {
        // console.log(fullname);
        // console.log(email);
        // console.log(password);
        // console.log(repass);
        const userData = {
          username: fullname,
          email: email,
          password: password
        };
        console.log(userData)
        const response=await axios.post("http://localhost:4000/user/newsignup", userData);
        alert(response.data.message);
        navigate("/signin");
      } catch (error) {
        console.error("Error:", error);
      } 
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
    <Navbar />
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'contain', maxHeight: '500px'}}>
      <Row className="justify-content-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
          <Form onSubmit={handleSignup} className='mt-3 text-white'>
            <h3 className="text-center mb-4">Sign Up</h3>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={fullname} placeholder="Enter your full name" onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password}placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={repass} placeholder="Confirm your password" onChange={(e) => setRepass(e.target.value)} />
            </Form.Group>
            <Button className='mt-3' variant="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
          <Link className='formlink' to="/signin">Already have an account?Sign In</Link>
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  );
};
export default SignUp;
