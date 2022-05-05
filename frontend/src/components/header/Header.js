import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css'

export default function Header() {

    return (
        <div>
            <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand>
                        <Link className="heading-item" to="/">MEW</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link className="heading-item" to="/create-wallet">Create a wallet</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="heading-item" to="/history">History</Link>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}