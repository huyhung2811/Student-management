import React from "react";
import { Link } from "react-router-dom"
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

function Header() {

    const linkStyle = {
        textDecoration: "none",
        color: "#ffffff"
      };

    return (
        <Navbar expand="lg" style={{ backgroundColor:"#36ABFF"}}>
            <Container bg="blue">
                <NavbarBrand><Link to="/" style={linkStyle}>Student List</Link></NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="crt-form">
                    <Nav><Link to="/Add" style={linkStyle}>Create New Student</Link></Nav>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;