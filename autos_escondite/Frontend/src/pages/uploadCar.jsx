import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UploadCar = () => {
  // State to store selected values
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [enteredModel, setEnteredModel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [enteredSeats, setEnteredSeats] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected values as needed (e.g., send to backend, update state, etc.)
    console.log('Selected Year:', selectedYear);
    console.log('Selected Make:', selectedMake);
    console.log('Entered Model:', enteredModel);
    console.log('Selected Type:', selectedType);
    console.log('Entered Seats:', enteredSeats);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
      <h1 style={{textAlign:"center"}}>Add a New Car</h1>
        <Col md={"4"} style={{margin:"0 2%"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="carYear">
              <Form.Label>Year</Form.Label>
              <Form.Control as="select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select Year</option>
                <option>2023</option>
                <option>2022</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carMake">
              <Form.Label>Make</Form.Label>
              <Form.Control as="select" value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                <option value="">Select Make</option>
                <option>Toyota</option>
                <option>Ford</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carModel">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" value={enteredModel} onChange={(e) => setEnteredModel(e.target.value)} placeholder="Enter car model" />
            </Form.Group>

            <Form.Group controlId="carType">
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control as="select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Select Vehicle Type</option>
                <option>Sedan</option>
                <option>SUV</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control type="number" value={enteredSeats} onChange={(e) => setEnteredSeats(e.target.value)} placeholder="Enter number of seats" />
            </Form.Group>
            
            <Button variant="primary" type="submit" block>
              Sign In
            </Button>          </Form>
        </Col>
        <Col md={"4"} style={{margin:"0 2%"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="carYear">
              <Form.Label>Year</Form.Label>
              <Form.Control as="select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select Year</option>
                <option>2023</option>
                <option>2022</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carMake">
              <Form.Label>Make</Form.Label>
              <Form.Control as="select" value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                <option value="">Select Make</option>
                <option>Toyota</option>
                <option>Ford</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carModel">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" value={enteredModel} onChange={(e) => setEnteredModel(e.target.value)} placeholder="Enter car model" />
            </Form.Group>

            <Form.Group controlId="carType">
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control as="select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Select Vehicle Type</option>
                <option>Sedan</option>
                <option>SUV</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="carSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control type="number" value={enteredSeats} onChange={(e) => setEnteredSeats(e.target.value)} placeholder="Enter number of seats" />
            </Form.Group>
            
            <Button variant="primary" type="submit" block>
              Sign In
            </Button>          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCar;
