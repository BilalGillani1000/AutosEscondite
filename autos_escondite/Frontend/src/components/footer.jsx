import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import {MDBFooter, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const Footer=()=>{
    return(
        <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
      <Row id="footer">
        <Col>
            <h3>AutosEscondite</h3>
            <p>Jinnah Company, Rawalpindi, Punjab, Pakistan</p>
        </Col>
        <Col>
            <h5>Vehicles</h5>
            <div>
            <Link to="/cars/sedans">Sedans</Link>
            </div>
            <div>
            <Link to="/cars/sedans">SUVs</Link>
            </div>
            <div>
            <Link to="/cars/sedans">Pickups</Link>
            </div>
        </Col>
        <Col>
        <h5>QuickLinks</h5>
            <div>
            <Link to="/">Privacy Policy</Link>
            </div>
            <div>
            <Link to="/">Services</Link>
            </div>
            <div>
            <Link to="/">FAQs</Link>
            </div>
        </Col>
        <Col>
            <h5>Contact</h5>
            <p>autosescondite@gmail.com</p>
            <p>+92-321-1234567 Punjab, Pakistan</p>
        </Col>
      </Row>
        <section className='mb-4'>
        <a href="#"><i class="fa fa-facebook"></i></a>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Copyright © 2024{" "} 
        <a className='text-white' href='/'>
          Autos Escondite
        </a>
      </div>
    </MDBFooter>
    );
}
export default Footer;

// function AutoLayoutExample() {
//   return (
    
//   );
// }

// export default AutoLayoutExample;