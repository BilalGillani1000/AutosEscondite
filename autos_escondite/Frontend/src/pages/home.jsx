// import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import IdealCar from "../components/idealCar";
import FeaturedCars from "../components/featuredCars";
import Event from "../components/events";
import Footer from "../components/footer";
import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { Container, Row, Col } from "react-bootstrap";
import { Carousel, Card } from 'react-bootstrap';
import img from "../content/images/download.jpeg";

const Home=()=>{
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
      const chunks = [
        carBrands.slice(0, 3),
        carBrands.slice(3, 6),
        carBrands.slice(6, 9),
        carBrands.slice(9, 12)
      ];
      
    return(
        <div>
            <Navbar />
            <HeroSection />
            <div>
                <IdealCar />
            </div>
            <Carousel indicators={false} className='carousel-dark'>
                {chunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                            <div className="d-flex justify-content-around" style={{padding:"4% 6%", paddingBottom:""}}>
                        {chunk.map(car => (
                            <FeaturedCars key={index} brand={car.brand} price={car.price}/>
            ))}
          </div>
        </Carousel.Item>
      ))}
        </Carousel>

        <Container style={{ width: '100%', height: '600px', padding:"7% 0"}}>
        <h3 className="text-center">News & Events</h3>
            <Row style={{ height: '100%', border: '1px solid #ccc' }}>
                <Col style={{ overflowY: 'scroll', height: '100%' }}>
                {carBrands.map((car,index) => (
                <Event key={index} bold={car.brand} news={car.price} />
                ))}
                </Col>
            </Row>
        </Container>

    <Footer />
        </div>
    );
}

export default Home;