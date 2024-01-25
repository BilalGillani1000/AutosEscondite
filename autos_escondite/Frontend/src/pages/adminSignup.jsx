import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../content/images/download.jpeg";

const AdminSignUp = () => {
  return (
    <Container fluid className="p-0" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover', minHeight: '100vh'}}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={6}>
          <Form>
            <h3 className="text-center mb-4">Sign Up as Admin</h3>
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
            <Form.Group>
              <Form.Control type="password" placeholder="Where are you?" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
          <a href='/'>Already have an account?Sign In</a>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminSignUp;
