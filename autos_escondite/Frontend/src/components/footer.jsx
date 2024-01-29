import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {MDBFooter, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import "../styles/styles.css";

const Footer=()=>{
    return(
        <div className="bg-dark" style={{paddingTop:"2%"}}>
        <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
      <Row id="footer">
        <Col>
            <Image src={require("../content/images/logo.jpg")} style={{width:"75%", borderRadius:"8px"}} className="mt-3"/>
            <p className="mt-4">Jinnah Company, Rawalpindi, Punjab, Pakistan</p>
        </Col>
        <Col>
            <h4>Vehicles</h4>
            <div>
            <Link to="/cars/category/sedan">Sedans</Link>
            </div>
            <div>
            <Link to="/cars/category/suv">SUVs</Link>
            </div>
            <div>
            <Link to="/cars/category/pickup">Pickups</Link>
            </div>
        </Col>
        <Col>
        <h4>QuickLinks</h4>
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
            <h4>Contact</h4>
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
    </div>
    );
}
export default Footer;