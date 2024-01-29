import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import IdealCar from "../components/idealCar";
import FeaturedCars from "../components/featuredCars";
import Event from "../components/events";
import Footer from "../components/footer";
import { Container, Row, Col } from "react-bootstrap";
import { Carousel} from 'react-bootstrap';
import axios from 'axios';
// import img from "../content/images/download.jpeg";

const Home=()=>{
    const [featuredCars, setFeaturedCars] = useState([]);
    const [featuredChunks, setFeaturedChunks] = useState([]);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const response1=axios.get('http://localhost:4000/featuredCars')
        const response2=axios.get('http://localhost:4000/events')
        Promise.all([response1, response2])
          .then(([response1, response2]) => {
            setFeaturedCars(response1.data.featuredCars);
            setEvents(response2.data.events);
          })
          .catch(error => {
            console.error('Error fetching cars and events:', error);
          });
      }, []);
      useEffect(() => {
        // Create chunks when featuredCars state updates
        makeChunks(featuredCars, 3);
      }, [featuredCars]);
      const makeChunks = (array, size) => {
        const chunkss = [];
        for (let i = 0; i < array.length; i += size) {
          chunkss.push(array.slice(i, i + size));
        }
        setFeaturedChunks(chunkss);
      };
      
    return(
        <div>
            <Navbar />
            <HeroSection />
            <div className='lightgray'>
                <IdealCar />
            </div>
            <div className='text-center whitesection' style={{padding: "4% 0"}}>
            <h2>Featured New Cars</h2>
            <Carousel indicators={false} className='carousel-dark'>
                {featuredChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                            <div className="d-flex justify-content-around" style={{padding:"4% 6%", paddingBottom:""}}>
                        {chunk.map(car => (
                            <FeaturedCars key={car.model} id={car._id} image={car.url} make={car.make} model={car.model} price={car.price}/>
            ))}
          </div>
        </Carousel.Item>
      ))}
        </Carousel>
        </div>

        <Container className='' style={{ width: '80%', height: '700px', padding:"7% 0"}}>
        <h3 className="text-center mb-5">News & Events</h3>
            <Row className='pt-2 pb-2' style={{ height: '100%', border: '1px solid #808080', borderRadius:"5px" }}>
                <Col style={{ overflowY: 'scroll', height: '100%' }}>
                {events.map((event,index) => (
                <Event key={index} bold={event.title} news={event.info} url={event.url} image={event.imageUrl}/>
                ))}
                </Col>
            </Row>
        </Container>

    <Footer />
        </div>
    );
}

export default Home;