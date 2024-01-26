import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/download.jpeg";
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
      }else if(response.data.message === "verified"){
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover', minHeight: '100vh'}}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
          <Form onSubmit={handleSignin}>
            <h3 className="text-center mb-4">Sign In</h3>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Sign In
            </Button>
          </Form>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
