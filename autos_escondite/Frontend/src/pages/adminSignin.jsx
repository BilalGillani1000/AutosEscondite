import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/form.jpg";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from "axios";

const AdminSignIn = () => {
  const navigate=useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const adminData= {
        email: email,
        password: password
      };
      const response=await axios.post("http://localhost:4000/admin/signin", adminData);
      if(! response.data.message){
        alert("Incorrect Username or Password");
      }else if(response.data.message === "ip") {
        alert("Incorrect Password");
      }else if(response.data.message === "verified"){
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div>
    <Navbar />
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'contain', maxHeight: '500px'}}>
      <Row className="justify-content-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
          <Form onSubmit={handleSignin} className='text-white mt-5'>
            <h3 className="text-center mb-4">Sign In as Admin</h3>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </Form.Group>
            <Button className='mt-3' variant="primary" type="submit" block>
              Sign In
            </Button>
          </Form>
          <Link className='formlink' to="/admin/signup">Don't have an account? Sign Up</Link>
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default AdminSignIn;
