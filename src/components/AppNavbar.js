import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" bg='light'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Movie Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/movies" exact={true}>{user.isAdmin === true && user.id !== null ? 'Dashboard' : 'Movies'}</Nav.Link>
                        {
                            user.id !== null ?
                            <>
                                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link> 
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link> 
                                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link> 
                            </>
                        } 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}