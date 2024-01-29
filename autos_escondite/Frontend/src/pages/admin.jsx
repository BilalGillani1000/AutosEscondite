import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Button } from "react-bootstrap";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const AdminPage=() => {
    return(
        <div>
        <Navbar/>
        <Container className="mt-5">
            <h1 className="text-center mb-5">Welcome to Admin Page</h1>
            <Row className="justify-content-center">
            <Col md={2}>
            <Button variant="primary" type="submit" block>
              <Link className="text-white" to="/admin/signin">Sign In</Link>
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
            <Link className="text-white" to="/admin/signup">Sign Up</Link>
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
            <Link className="text-white" to="/admin/uploadcar">Add a Car</Link>
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
            <Link className="text-white" to="/admin/uploadevent">Add an Event</Link>
            </Button>
            </Col>
            </Row>
        </Container>
        <div className="fixed-bottom">
        <Footer />
        </div>
        </div>
    );
};
export default AdminPage;