import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";

const UploadEvent = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

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

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const eventData={
        title: title,
        info: details,
        imageUrl: imagePath,
        url: url
      };
      const response=await axios.post("http://localhost:4000/admin/uploadevent", eventData);
      alert(response.data.message);
  } catch (error) {
    console.error("Error:", error);
  } 
  };

  return (
    <div>
    <Navbar />
    <Container className="mt-5">
          <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
      <h1 style={{textAlign:"center"}}>Add an Event</h1>
        <Col md={"4"} style={{margin:"0 2%"}}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control type="text" as="textarea" rows={5}  value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Add event details" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter event link" />
            </Form.Group>
        </Col>
        <Col md={"4"} className="">
          <div style={{padding:"2em 1em"}}>
            <Form.Control type='file' accept='image/*' onChange={handleImageChange}></Form.Control>
            <Button onClick={handleUpload}>Upload Image</Button>
          </div>
        </Col>
        <Col md={"4"}>
          <Button variant="primary" type="submit" block>
                Upload Event
          </Button>
        </Col>
      </Row>
      </Form>
    </Container>
    <Footer />
    </div>
  );
};

export default UploadEvent;
