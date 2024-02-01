import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";

const UploadEvent = () => {
  const navigate=useNavigate();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user || user.role !== "admin") {
        // localStorage.removeItem("token");
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
      alert("Image Uploaded Successfully")
      console.log('Image uploaded with url:', imagePath);
    }
  }, [imagePath]);

  const signout=() => {
    localStorage.removeItem("token");
      window.location.href = "/admin/uploadcar";
  };

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
      window.location.href = "/admin/uploadevent";
      alert(response.data.message);
  } catch (error) {
    console.error("Error:", error);
  } 
  };

  return (
    <div>
    <Navbar name="Sign out" onclick={signout} />
    <Container className="mt-4" style={{minHeight:"450px"}}>
          <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
      <h1 style={{textAlign:"center"}}>Add an Event</h1>
        <Col md={"4"} style={{margin:"0 2%"}}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control type="text" required as="textarea" rows={5}  value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Add event details" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter event link" />
            </Form.Group>
        </Col>
        <Col md={"4"} className="">
          <div style={{padding:"2em 1em"}}>
            <Form.Control type='file' required accept='image/*' onChange={handleImageChange}></Form.Control>
            <Button className='mt-3 btn-sm' onClick={handleUpload}>Upload Image</Button>
          </div>
        </Col>
        <Col md={"4"}>
          <Button className='mt-4' variant="primary" type="submit" block>
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
