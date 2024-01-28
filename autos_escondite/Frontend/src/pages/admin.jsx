import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Button } from "react-bootstrap";
import Footer from "../components/footer";

const AdminPage=() => {
    return(
        <div>
        <Navbar/>
        <Container className="mt-5">
            <h1 className="text-center mb-5">Welcome to Admin Page</h1>
            <Row className="justify-content-center">
            <Col md={2}>
            <Button variant="primary" type="submit" block>
              Sign In
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
              SignUp
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
              Add New Car
            </Button>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit" block>
              Add New Event
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