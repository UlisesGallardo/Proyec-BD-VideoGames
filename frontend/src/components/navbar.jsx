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

    //Validar juego

    const validar = ()=>{
        axios({
            url: "http://localhost:8080/api/videojuego/validar/"+juego,
            method: "GET",
        })
        .then((response) => {
            console.log(response.data.recordsets[0][0].existe)
            if(response.data.recordsets[0][0].existe){
                navigate('/info', {state:{Nombre:juego}});
            } 
            else{
                MySwal.fire({
                    title: "El juego no encontrado",
                    icon: "error",
                    text: "Revisa el nombre del juego",
                    confirmButtonText: "Intenta de nuevo",
                });
            }
        })
        .catch((error) => {
        console.log("Error", error);
        })
    }

    const handleChange = (e)=>{
        setJuego(e.target.value);
    }

    return (
        <div>
            <Navbar bg="light" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleChange}
                            />
                            <Button variant="outline-success" onClick={validar}>Search</Button>
                        </Form>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/">Casita</Nav.Link>
                        <NavDropdown title="Tops" id="offcanvasNavbarDropdown">
                            <NavDropdown.Item href="#action3">Ventas</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Puntaje</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
    
}

export default NavbarLateral
