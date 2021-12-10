import { Card, Button } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function TopCard(props) {
    let navigate = useNavigate();

    const Buscar = ()=>{
        navigate('/info', {state:{Nombre:props.Nombre}});
    }

    return (
        <div>
            <Card bg="dark" text="light" border="info" className="mt-5">
                <Card.Header as="h5">{props.Numero}. {props.Nombre}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.Global}</Card.Title>
                    <Card.Text>
                    {props.All}
                    </Card.Text>
                    <Button variant="outline-info" onClick={Buscar}>Ver juego</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TopCard
