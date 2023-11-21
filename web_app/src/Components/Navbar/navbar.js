import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";
import { Button } from "react-bootstrap";


function NavBar() {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" style={{ position: 'fixed'}}>
            <Container>
                <Navbar.Brand>
                    <NavLink to="/">
                        <img src="/assets/Logo.png" alt="ECS Logo" className="logo-img" />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className="navLink">Home</NavLink>
                        <NavLink to="/support" className="navLink">Support</NavLink>
                        <NavLink to="/login" className="navButton">
                            <Button variant="outline-primary">Login</Button>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;