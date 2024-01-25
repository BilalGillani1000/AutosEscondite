import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/download.jpeg";
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover', minHeight: '100vh'}}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
          <Form>
            <h3 className="text-center mb-4">Sign Up</h3>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
          <Link to="/signin">Already have an account?Sign In</Link>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
