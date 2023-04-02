import { Navbar,Container,Offcanvas,Nav,Form,Button,FormControl,NavDropdown } from 'react-bootstrap';
import {useState, useEffect} from "react"
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function NavbarLateral() {
    let navigate = useNavigate();
    const [juego, setJuego] = useState("")

    return (
        <div>
            <Navbar bg = "dark" variant = "dark" expand={true} className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="/">
                        iLoveVideoGames
                    </Navbar.Brand>  

                    <Nav  className="me-auto">
                        <Nav.Link href="/">Juegos Indie</Nav.Link>
                        <Nav.Link href="/arteGenerativo">Arte generativo</Nav.Link>
                    </Nav>
                    

                    {/*
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >

                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Opciones</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="d-flex mb-3">
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Buscar"
                                onChange={handleChange}
                            />
                            <Button variant="outline-info" onClick={validar}>Buscar</Button>
                        </Form>

                       

                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Búsqueda avanzada</Nav.Link>
                        </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    */}
                </Container>
            </Navbar>
        </div>
    )
    
}

export default NavbarLateral
