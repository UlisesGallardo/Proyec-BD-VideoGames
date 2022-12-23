import React from 'react'
import { Card, Col, Container, Row} from 'react-bootstrap';


function Carta(props) {
    console.log(props)

    let url = props.img.replace("t_thumb", "t_cover_big");

    return (
        <div>
            <Card bg="dark" text="light" border="info"style={{ width: '50rem' }} className="ms-auto me-auto">
                        <Card.Body>
                            <Container>
                            <Row>
                            <Col>
                                <Card.Title  className='d-flex justify-content-center'  >{props.nombre}</Card.Title>
                                    
                                    {
                                            props.datos.map((Objeto, index)=>{
                                                return <div key={index}>

                                                {index>1 && Objeto.valor!= null && Objeto.valor!== '' && Objeto.prop[0] !== 'I' && Objeto.prop[1] !== 'D' &&
                                                <Row md={2} className="g-4">
                                                    <Col >
                                                            {Objeto.prop }
                                                    </Col>

                                                    <Col>
                                                            {Objeto.valor}                                                
                                                    </Col>
                                                </Row>
                                                }
                                                </div>
                                            })
                                    }
                                    
                            </Col>
                            <Col>
                                <Card.Img variant="top" src={url} style={{ width: '20rem' }}/>
                            </Col>
                            </Row>
                            </Container>
                        </Card.Body>
            </Card>
        </div>
    )
}

export default Carta
