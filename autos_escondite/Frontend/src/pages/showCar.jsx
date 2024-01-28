import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Form, Button } from 'react-bootstrap';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from 'axios';

const ShowCar = () => {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState(null);

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
          <Navbar />
          <Container className="mt-5">
            <div>
              <Row className='justify-content-center'>
                <Col xs={12} md={6} lg={8} className="mb-4">
                  <Image style={{ width: "100%" }} src={require(`../${carDetails.url}`)} />
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <h2 className='mt-3'>{carDetails.make} {carDetails.model}</h2>
                  <p>Type: {carDetails.type}</p>
                  <p>Number of Seats: {carDetails.seats}</p>
                  <p>Mileage: {carDetails.mileage} kms per litre</p>
                  <p>Price: Rs {carDetails.price}</p>
                  <p>Rating: <Badge bg="info">{rating}</Badge></p>
                </Col>
              </Row>
              <Row>
                <Col md={7} style={{ margin: "" }}>
                  <Row style={{ height: '100%', border: '1px solid #ccc' }}>
                    <Col style={{ overflowY: 'scroll', height: '100%' }}>
                      {comments && comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <div key={index}>
                            <p>{comment}</p>
                          </div>
                        ))
                      ) : (
                        <div>
                          <h3>No Reviews Yet</h3>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col md={4} className=''>
                  <Form onSubmit={handleSubmit}>
                    <Form.Control as="select" value={newRating} onChange={(e) => setNewRating(e.target.value)}>
                      <option value={0}>Select Rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Form.Control>
                    <Form.Group>
                      <Form.Control type="text" as="textarea" rows={5} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Make a review" />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
          <Footer />
        </>
      ) : (
        <p>Error fetching car details.</p>
      )}
    </div>
  );
};

export default ShowCar;
