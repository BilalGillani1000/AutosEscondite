import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const _ = require("lodash");

const ListCars = () => {
  const { category } = useParams();
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cars/category/${category}`);
        setCars(response.data.cars);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [category]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navbar />
          <Container className="mb-5 mt-4" style={{ flex: 1 }}>
            <h2 className="text-center mb-5">
              {cars && cars.length > 0
                ? `Results for : ${_.startCase(category)}`
                : `No results for ${category}`}
            </h2>
            {cars && cars.length > 0 && (
              <Row className="justify-content-center align-items-center">
                {cars.map((car) => (
                  <Col key={car._id} md={3} className="mb-3">
                    <Card style={{ width: '15rem', margin: '10px' }}>
                      <Card.Img style={{ height: "11em" }} variant="botttom" src={require(`../${car.url}`)} />
                      <Card.Body>
                        <Card.Title>{car.make} {car.model}</Card.Title>
                        <Card.Text>
                          Starting from
                          <h4>Rs {car.price}</h4>
                        </Card.Text>
                        <Link to={`/cars/${car._id}`}>Explore</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ListCars;
