import React from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = ({ wishlistCount = 0 }) => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">MovieDB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) => isActive ? "active" : ""}
              end
            >
              Movies
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/wishlist"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Wishlist ({wishlistCount})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
