import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/form.jpg";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from "axios";

const AdminSignUp = () => {
  const navigate=useNavigate();

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');
  const [key, setKey] = useState('');
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === repass) {
      try {
        // console.log(fullname);
        // console.log(email);
        // console.log(password);
        // console.log(repass);
        const adminData = {
          adminname: fullname,
          email: email,
          password: password,
          key: key
        };
        console.log(adminData);
        const response=await axios.post("http://localhost:4000/admin/newsignup", adminData);
        alert(response.data.message);
        navigate("/admin/signin");
      } catch (error) {
        console.error("Error", error);
      } 
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
    <Navbar name="Sign in" path="/admin/signin" />
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'contain', maxHeight: '500px'}}>
      <Row className="justify-content-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
        <Form onSubmit={handleSignup} className='text-white mt-2'>
            <h3 className="text-center mb-4">Sign Up as Admin</h3>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" required value={fullname} placeholder="Enter your full name" onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={password}placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required value={repass} placeholder="Confirm your password" onChange={(e) => setRepass(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Can u answer this?</Form.Label>
              <Form.Control type="password" required value={key} placeholder="Where are you?" onChange={(e) => setKey(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
          <Link to="/admin/signin">Already have an account?Sign In</Link>
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  );
};
export default AdminSignUp;
