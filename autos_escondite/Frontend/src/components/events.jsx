import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Event(props) {
  return (
        <div class="card flex-row"><img class="card-img-left example-card-img-responsive" src={require("../content/images/download.jpeg")}/>
          <div class="card-body">
            <h4 class="card-title h5 h4-sm">{props.bold}</h4>
            <p class="card-text">{props.news}</p>
          </div>
        </div>
  );
}

export default Event;