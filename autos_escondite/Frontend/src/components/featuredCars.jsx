import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../content/images/download.jpeg";


const FeaturedCars=(props)=>{
    return(
      <Card>
      <Card.Img variant="botttom" src={img} />
      <Card.Body>
        <Card.Title>{props.brand}</Card.Title>
        <Card.Text>
          Starting from
          <h4>Rs {props.price}</h4>
        </Card.Text>
        <a href="#">Explore</a>
      </Card.Body>
    </Card>
    );
}
export default FeaturedCars;
