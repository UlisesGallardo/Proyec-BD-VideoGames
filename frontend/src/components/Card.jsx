import React from 'react'
import { Card, Col, Container, Row} from 'react-bootstrap';


function Carta(props) {
    console.log(props   )
    return (
        <div>
            <Card style={{ width: '50rem' }} className="ms-auto me-auto">
                        <Card.Body>
                            <Container>
                            <Row>
                            <Col>
                                <Card.Title style={{ alignItems:'center' }}>{props.nombre}</Card.Title>
                                    {
                                            props.datos.map((Objeto, index)=>{
                                                return <div key={index}>

                                                {Objeto.valor!= null && Objeto.prop[0] !== 'I' && Objeto.prop[1] !== 'D' &&
                                                <Card.Text >
                                                    {Objeto.prop + " : "}
                                                    {Objeto.valor}
                                                </Card.Text>
                                                }
                                                </div>
                                            })
                                    }
                            </Col>
                            <Col>
                                <Card.Img variant="top" src={props.img} style={{ width: '20rem' }}/>
                            </Col>
                            </Row>
                            </Container>
                        </Card.Body>
            </Card>
        </div>
    )
}

export default Carta
