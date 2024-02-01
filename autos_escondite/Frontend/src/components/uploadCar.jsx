import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";

const UploadCar = () => {
  const navigate=useNavigate();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [featured, setFeatured] = useState('');
  const [year, setYear] = useState('');
  const [seats, setSeats] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/admin/signin");
      }
    } else {
      navigate("/admin/signin");
    }
  }, []);


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        alert('Image not Selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedImage);

      fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setImagePath(data.imageUrl);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  useEffect(() => {
    if (imagePath) {
      console.log('Image uploaded with url:', imagePath);
    }
  }, [imagePath]);
  
  const signout=() => {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const carData={
        make: make,
        model: model,
        type: type,
        featured: featured,
        year: year,
        seats: seats,
        mileage: mileage,
        price: price,
        url: imagePath
      };
      const response=await axios.post("http://localhost:4000/admin/uploadcar", carData);
      alert(response.data.message);
  } catch (error) {
    console.error("Error:", error);
  } 
  };

  return (
    <div>
    <Navbar name="Sign out" path="/admin/signin" onclick={signout}/>
    <Container className="mt-5">
          <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
      <h1 style={{textAlign:"center"}}>Add a New Car</h1>
        <Col md={"3"} style={{margin:"0 2%"}}>
          <Form.Group>
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Enter car model" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Enter car model" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Vehicle Type</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Pickup</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Featured</Form.Label>
              <Form.Control as="select" value={featured} onChange={(e) => setFeatured(e.target.value)}>
                <option value="">Select Year</option>
                <option>yes</option>
                <option>no</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>
        </Col>
        <Col md={"3"} style={{margin:"0 2%"}}>
          <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Manufacturing year" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Seats</Form.Label>
              <Form.Control type="number" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Number of seats" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mileage</Form.Label>
              <Form.Control type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="km per litre" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="pkr" />
            </Form.Group>
        </Col>
        <Col md={"4"} className="">
          <div style={{padding:"2em 1em"}}>
            <Form.Control type='file' accept='image/*' onChange={handleImageChange}></Form.Control>
            <Button onClick={handleUpload}>Upload Image</Button>
          </div>
        </Col>
        <Col md={"2"}>
          <Button variant="primary" type="submit" block>
                Upload Car
          </Button>
        </Col>
      </Row>
      </Form>
    </Container>
    <Footer />
    </div>
  );
};

export default UploadCar;
