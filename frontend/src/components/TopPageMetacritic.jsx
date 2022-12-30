import { Container , Row, Col} from 'react-bootstrap';
import TopCard from './TopCard';
import react, {useEffect, useState} from "react"
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Chart from "./Chart"
import ReactLoading from 'react-loading';
import dotenv from "dotenv";
import Form from "react-bootstrap/Form";

import data from './steam.json';

function TopPageMetacritic() {

    //console.log("Juegos:",juegos["applist"]["apps"]["Cycladea"])
    console.log("juegos",data["applist"]["apps"]);
    dotenv.config();

    const location = useLocation();
    const [Top, setTop] = useState([])
    const [Nombres, setNombres] = useState([])
    const [Datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)

    
    useEffect(()=>{
            
            var url = "http://localhost:8081/api/videojuegos/topMetacritic"; 
            axios({
                url: url,
                method: "GET",
            })
            .then((response) => {            
                console.log("url:",url," datos desde TopPage", response.data);

                var juegos = []
                juegos = response.data["results"];

                const m = new Map()
                juegos.map((Objeto)=>{
                    Datos.push({"PuntajeMetacritic":Objeto["metacritic"],"Nombre":Objeto["name"]})

                    Top.push({"PuntajeMetacritic":Objeto["metacritic"],
                              "Nombre":Objeto["name"],
                              "AnioSalida":Objeto["released"],
                              "Genero":Objeto["genres"][0]["name"],
                              "url":Objeto["background_image"]})
                })
                setLoading(true);
            }).catch((error) => {
                console.log("Error", error);
            })  
    },[])
    
    {
        if(loading == false) return <div className='d-flex justify-content-center' ><ReactLoading className='d-flex justify-content-center'  type = {"bars"} color = {"#2E4053"} height={'10%'} width={'10%'} /></div>
    }

    return (
        <div>
            <div><Form.Control type="date" name='date_of_birth'/> |</div>
            <Container className='mt-5 mb-5'>
                {loading && <Row xs={1} md={2} className="g-4">
                    {
                        Top.map((Objeto, index)=>{
                            return <div key={index}>
                                    {
                                        index+1 <= 50 && index+1 >=1 && <Col><TopCard Numero={index+1} Nombre={Objeto.Nombre} url={Objeto.url} Global={"Puntaje Metacritic: "+Objeto.PuntajeMetacritic} All={"Fecha de Salida: "+Objeto.AnioSalida+" Género: "+Objeto.Genero} /> </Col>
                                    }     
                                
                                </div>
                        })
                    }
                </Row>                  
                }
                
            </Container>
        </div>
    )
}

export default TopPageMetacritic
