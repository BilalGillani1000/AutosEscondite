import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer=()=>{
    return(
        <div>
        <Container>
      <Row>
        <Col>
            <h3>AutosEscondite</h3>
        </Col>
        <Col>
            <h5>Vehicles</h5>
            <ul>
                <li>Sedans</li>
                <li>SUVs</li>
                <li>Pickup Trucks</li>
            </ul>
        </Col>
        <Col>
        <h5>QuickLinks</h5>
        <ul>
                <li>Sedans</li>
                <li>SUVs</li>
                <li>Pickup Trucks</li>
            </ul>
        </Col>
        <Col>
            <h5>Contact</h5>
        </Col>
      </Row>
    </Container>
        </div>
    );
}
export default Footer;

// function AutoLayoutExample() {
//   return (
    
//   );
// }

// export default AutoLayoutExample;