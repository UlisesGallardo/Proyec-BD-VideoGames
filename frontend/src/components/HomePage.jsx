import { Card, Button, Container, Nav } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";



function HomePage() {
    let navigate = useNavigate();
    const TopVentas = ()=>{
        navigate('/toppage', {state:{top:true}});
    }

    const TopPuntaje = ()=>{
        navigate('/toppage', {state:{top:false}});
    }

    return (
        <div>
            <Container>
                <Card bg="dark" text="light" border="info" className="text-center mt-5">
                    <Card.Header>Top Ventas</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce los juegos más vendidos.</Card.Title>
                        <Card.Text>
                        Aquí podrás ver las ventas globales y por región de muchos videojuegos de los últimos tiempos.
                        </Card.Text>
                        <Button variant="outline-info" onClick={TopVentas}>Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Juegos entre 1980 y 2017.</Card.Footer>
                </Card>
                <Card bg="dark" text="light" border="info" className="text-center mt-5">
                    <Card.Header>Top Calificación</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce los juegos mejor valorados.</Card.Title>
                        <Card.Text>
                        Aquí podrás ver los puntajes de los usuarios y de la crítica especializada de muchos videojuegos de los últimos tiempos.
                        </Card.Text>
                        <Button variant="outline-info" onClick={TopPuntaje}>Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Juegos entre 2011 y 2019.</Card.Footer>
                </Card>
                <Card bg="dark" text="light" border="info" className="text-center mt-5 mb-5">
                    <Card.Header>Búsqueda avanzada</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce juegos de acuerdo a las características que tú definas.</Card.Title>
                        <Card.Text>
                        Aquí podrás buscar juegos y ordenarlos de acuerdo al criterio que tú decidas.
                        </Card.Text>
                        <Button variant="outline-info">Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Experimenta y conoce.</Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default HomePage
