import { Navbar,Container,Offcanvas,Nav,Form,Button,FormControl,NavDropdown } from 'react-bootstrap';

function NavbarLateral() {
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
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">Casita</Nav.Link>
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
