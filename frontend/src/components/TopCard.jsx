import { Card, Button ,  Col, Container,Row} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function TopCard(props) {
    let navigate = useNavigate();

    const Buscar = ()=>{
        console.log("datos enviados",props.Info)
        navigate('/info', {state:{Info:props.Info}});
    }

    return (
            <Card bg="dark" text="light" border="info" className="mt-10" style={{ height: '18rem'}} >
                
                        <Card.Img  src={props.url} alt="Card image"  style={{ height:"100%", opacity:"0.4"}} />
                        <Card.ImgOverlay>
                        {/*<Card.Header as="h5">{props.Numero}. {props.Nombre}</Card.Header>*/}

                        <Card.Body >
                            <Card.Title className='d-flex justify-content-center'>{props.Numero}. {props.Nombre}</Card.Title>
                            <Card.Title className='d-flex justify-content-center'>{props.Global}</Card.Title>
                            <Card.Text className='d-flex justify-content-center'>{props.All}</Card.Text>
                              
                            <div className='d-flex justify-content-center'>
                                <Button className='d-flex justify-content-center' variant="outline-info" onClick={Buscar}>Ver juego</Button>
                            </div>   
                        </Card.Body>
                    </Card.ImgOverlay>
            </Card>
    )
}

export default TopCard
