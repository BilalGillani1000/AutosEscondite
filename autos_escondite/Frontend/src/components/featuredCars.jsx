import React from "react";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
// import img from "../content/images/download.jpeg";


const FeaturedCars=(props)=>{
  const image=require(`../${props.image}`);
    return(
      <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img style={{height:"11em"}} variant="botttom" src={image} />
      <Card.Body>
        <Card.Title>{props.make}{" "}{props.model}</Card.Title>
        <Card.Text>
          Starting from
          <h4>Rs {props.price}</h4>
        </Card.Text>
        <Link to={`/cars/${props.id}`}>Explore</Link>
      </Card.Body>
    </Card>
    );
}
export default FeaturedCars;
