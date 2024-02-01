import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Form, Button } from 'react-bootstrap';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from 'axios';

const ShowCar = () => {
  const navigate=useNavigate();
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cars/${carId}`);
        console.log(response.data);
        setCarDetails(response.data.carDetails);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    if (carDetails) {
      setComments(carDetails.reviews ? carDetails.reviews.comments : []);
      setRating(carDetails.reviews ? parseFloat(carDetails.reviews.rating.toFixed(1)) : null);
    }
  }, [carDetails]);

  const signout=() => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        rating: newRating,
        comment: newComment,
      };
      console.log(reviewData);
      const response = await axios.post(`http://localhost:4000/newreview/${carId}`, reviewData);
      alert(response.data.message);
      window.location.reload(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : carDetails ? (
        <>
        <Navbar name="Sign out" onclick={signout}/>
          <Container className="mt-5">
            {carDetails && Object.keys(carDetails).length > 0 ? (
              <div>
                <Row className='justify-content-center'>
                  <Col xs={12} md={6} lg={8} className="mb-4">
                    <Image style={{ width: "100%", borderRadius:"5px"}} src={require(`../${carDetails.url}`)} />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <h1 className='mt-3 mb-4'>{carDetails.make} {carDetails.model}</h1>
                    <h5 className='mb-3'>Type: {carDetails.type}</h5>
                    <h5 className='mb-3'>Manufacturing Year: {carDetails.year}</h5>
                    <h5 className='mb-3'>Number of Seats: {carDetails.seats}</h5>
                    <h5 className='mb-3'>Mileage: {carDetails.mileage} kms per litre</h5>
                    <h5 className='mb-3'>Price: Rs {carDetails.price}</h5>
                    <h5 className='mb-3'>Rating: <Badge bg="primary">{rating}</Badge></h5>
                  </Col>
                </Row>
                <Row className='mb-5'>
                  <Col md={7} style={{ marginRight: "50px" }}>
                    <Row style={{ height: '100%', border: '1px solid #ccc', borderRadius:"6px" }}>
                    <h3>Reviews</h3>
                      <Col style={{ overflowY: 'scroll', height: '100%' }}>
                        {comments && comments.length > 0 ? (
                          comments.map((comment, index) => (
                            <div key={index} style={{borderRadius:"3px", backgroundColor:'rgb(242,242,242)'}}>
                              <p className='m-2 p-1'>{comment}</p>
                            </div>
                          ))
                        ) : (
                          <div>
                            <h5 className='text-center'>No Reviews Yet</h5>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4} className=''>
                    <Form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Make a Review</h3>
                    <Form.Label>Rating</Form.Label>
                      <Form.Control as="select" value={newRating} onChange={(e) => setNewRating(e.target.value)}>
                        <option value={0}>Select Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Form.Control>
                      <Form.Group className='mt-3'>
                        <Form.Control type="text" as="textarea" rows={5} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Leave a comment..." />
                      </Form.Group>
                      <Button className='mt-3' variant="primary" type="submit" block>
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            ) : (
              <p className='text-center'>No Results Found</p>
            )}
          </Container>
          <Footer />
        </>
      ) : (
        <p className='text-center'>No Results Found</p>
      )}
    </div>
  );
};

export default ShowCar;
