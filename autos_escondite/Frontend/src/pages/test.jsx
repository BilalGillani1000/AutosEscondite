import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import img from "../content/images/download.jpeg";
import Col from 'react-bootstrap';

const Test = () => {
  const carBrands = [
    { brand: 'Toyota', price: 25000 },
    { brand: 'Honda', price: 23000 },
    { brand: 'Ford', price: 27000 },
    { brand: 'Chevrolet', price: 26000 },
    { brand: 'Nissan', price: 24000 },
    { brand: 'Mercedes-Benz', price: 55000 },
    { brand: 'BMW', price: 60000 },
    { brand: 'Audi', price: 58000 },
    { brand: 'Tesla', price: 70000 },
    { brand: 'Hyundai', price: 22000 },
    { brand: 'Volkswagen', price: 28000 },
    { brand: 'Mazda', price: 25000 }
  ];

  // Split carBrands array into four chunks for each carousel slide
  const chunks = [
    carBrands.slice(0, 3),
    carBrands.slice(3, 6),
    carBrands.slice(6, 9),
    carBrands.slice(9, 12)
  ];

  return (
    <Carousel indicators={false} className='carousel-dark'>
      {chunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-around" style={{ padding:"4% 6%", paddingBottom:""}}>
            {chunk.map(car => (
              <Card key={car.brand} style={{ width: '' }}>
                <Card.Img variant="botttom" src={img} />
                <Card.Body>
                  <Card.Title>{car.brand}</Card.Title>
                  <Card.Text>
                    Starting from
                    <h4>Rs {car.price}</h4>
                  </Card.Text>
                  <a href="#">Explore</a>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Test;
