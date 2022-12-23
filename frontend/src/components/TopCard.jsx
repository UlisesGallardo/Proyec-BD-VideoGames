import { Card, Button } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function TopCard(props) {
    let navigate = useNavigate();

    const Buscar = ()=>{
        navigate('/info', {state:{Nombre:props.Nombre}});
    }

    return (
        <div>
            <Card bg="dark" text="light" border="info" className="mt-10">
                <Card.Header as="h5">{props.Numero}. {props.Nombre}</Card.Header>
                <Card.Body >
                    <Card.Title className='d-flex justify-content-center'>{props.Global}</Card.Title>
                    <Card.Text className='d-flex justify-content-center'>
                        {props.All}
                    </Card.Text>
                    <div className='d-flex justify-content-center'>
                        <Button className='d-flex justify-content-center' variant="outline-info" onClick={Buscar}>Ver juego</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TopCard
