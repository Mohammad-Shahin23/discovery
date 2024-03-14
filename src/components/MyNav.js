import { Link, useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/ab_logo_color-01-removebg-preview.png';


function MyNav() {

  

  const location = useLocation();

  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Arab Bank"
          />
          </Navbar.Brand>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            
            <Nav.Link href="/">Manegers</Nav.Link>
            <Nav.Link href="/MyFeedback">Feedback</Nav.Link>
            <Nav.Link href="/Tickets">Tickets</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;