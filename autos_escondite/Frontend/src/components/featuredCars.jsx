import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const FeaturedCars = (props) => {
  const image = require(`../${props.image}`);

  return (
    <Card style={{ margin: '10px', overflow: 'hidden' }}>
      <Link to={`/cars/${props.id}`} style={{ display: 'block', width: '100%' }}>
        <Card.Img style={{ height: "11em", objectFit: 'cover' }} variant="bottom" src={image} />
      </Link>
      <Card.Body>
        <Card.Title>{props.make} {props.model}</Card.Title>
        <Card.Text>
          Starting from
          <h4>Rs {props.price}</h4>
        </Card.Text>
        <Link to={`/cars/${props.id}`} style={{ display: 'block', width: '100%' }}>Explore</Link>
      </Card.Body>
    </Card>
  );
}

export default FeaturedCars;
