import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Event(props) {
  return (
    <Row>
    <Col md={12}>
      <Card className="flex-row">
        <Link to={props.url} style={{width:"30%", height:"180px"}}><Card.Img
          className="card-img-left example-card-img-responsive"
          src={require(`../${props.image}`)}
        /></Link>
        <Card.Body style={{width:"70%", height:"180px"}}>
          <Card.Title as="h4">{props.bold}</Card.Title>
          <Card.Text>{props.news.substring(0,400)}...{" "}<Link to={props.url}>Read more</Link></Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  );
};

export default Event;