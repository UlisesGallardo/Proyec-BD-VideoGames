import { Container , Row, Col, Dropdown , DropdownButton, Card } from 'react-bootstrap';
import TopCard from './TopCard';
import react, {useEffect, useState} from "react"
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import GemeralChart from "./GeneralChart"
import ReactLoading from 'react-loading';
import dotenv from "dotenv";
import Form from "react-bootstrap/Form";
import Pagination from 'react-bootstrap/Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function TopPageMetacritic() {
    dotenv.config();

    const location = useLocation();
    const [Top, setTop] = useState([])
    const [Nombres, setNombres] = useState([])
    const [Datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1)
    const [startDate, setStartDate] = useState(new Date())
    const [year, setYear] = useState((new Date()).getFullYear())
    const [colors, setColors] = useState([])
    let pages = [...Array(5).keys()].map( i => i+1);

    const restart = () => {
        setDatos([]);
        setNombres([]);
        setTop([]);
        setLoading(false);
    }

    const paginationClicked = (itemClicked) => {
        if(currentPage!=itemClicked){
            console.log("Elemento: ",itemClicked);
            restart();
            setCurrentPage(itemClicked); 
        }   
    }

    const yearCliked = (date)=>{
        const d = new Date(date);
        console.log("Año:",d.getFullYear());
        setStartDate(date);
        setYear(d.getFullYear());
        restart();
    }

    const addDays = (date, days)  =>{
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    useEffect(()=>{
            var url = "http://localhost:8081/api/videojuegos/topMetacritic";
            console.log("Año",year);
            axios.get(url, {
                params: {
                    Page: currentPage,
                    Year: year
                }
            }).then((response) => {            
                console.log("url:",url," datos desde TopPage", response.data);

                var juegos = []
                juegos = response.data["results"];
                

                juegos.map((Objeto)=>{
                    Datos.push({"PuntajeMetacritic":Objeto["metacritic"],
                                "Nombre":Objeto["name"]})

                    Nombres.push(Objeto["name"])
                    //colors.push()

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
    },[currentPage, year])


    /* 1970 - actualidad */

    return (
        <div>
            <br></br><br></br><br></br>
            <div className='d-flex justify-content-center'> <h1 className="display-1" style={{"font-size":"4rem", "-webkit-text-stroke":"5px black  ", color:"black"}}>Top Juegos Mejores Puntuados Metacritic {year}</h1></div>
            <Container className='mt-5 mb-5'>
            <Col ><h3>Filtros</h3>       
                        <Container  >
                            <Card bg="light" text="dark" border="info">
                            <Row xs={1} md={2}>         
                                            <Col>
                                                <Col><h4 className='d-flex justify-content-center'>Página</h4></Col>    
                                                <Pagination className='d-flex justify-content-center'> 
                                                    {pages.map((item) => {
                                                        return (
                                                            <Pagination.Item
                                                                key={item}
                                                                onClick={() => paginationClicked(item)}
                                                                active={item === currentPage}
                                                            >
                                                                {item}
                                                            </Pagination.Item>
                                                        );
                                                    })}
                                                </Pagination>
                                            </Col>
                                            <Col>
                                                <Row >
                                                    <Col >
                                                    <div>
                                                        <Row><h4 className='d-flex justify-content-center'>Año</h4></Row>
                                                        <Row >
                                                            <div style={{margin: "0 35%",
                                                                        display: "flex",
                                                                        justifyContent: "center",}}>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date) => yearCliked(date)}
                                                                showYearPicker
                                                                minDate={new Date(1970)}
                                                                maxDate={new Date()}
                                                                dateFormat="yyyy"
                                                                placeholderText="1970-Actualidad"
                                                            />
                                                            </div>
                                                        </Row>
                                                    </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row> 
                                        </Card>
                            </Container>
                        </Col>
                    </Container>

            <Container className='mt-5 mb-5'>
                {loading ? <div>
                        
                            <GemeralChart
                                    informacion = {{ArreglodeObjetos:  Datos,
                                    labels: Nombres, 
                                    titulo: "Mejores Puntajes", 
                                    colores:"green"}} 
                                    flag = {false}
                                />
                        
                    
                    <br></br>

                        <Row xs={1} md={2} className="g-4">
                            {
                                Top.map((Objeto, index)=>{
                                    {
                                    
                                            return <div key={index}>
                                                    <Col><TopCard Numero={(index+1 + (currentPage-1)*20)} Nombre={Objeto.Nombre} url={Objeto.url} Global={"Puntaje Metacritic: "+Objeto.PuntajeMetacritic} All={"Fecha de Salida: "+Objeto.AnioSalida+" Género: "+Objeto.Genero} /> </Col>                                       
                                            </div>
                                    
                                    }
                                    
                                })
                            }
                            
                        </Row> 

                       
                </div>
                : <div className='d-flex justify-content-center' ><ReactLoading className='d-flex justify-content-center'  type = {"bars"} color = {"#2E4053"} height={'10%'} width={'10%'} /></div>               
                }
            </Container>

                
        </div>
    )
}

export default TopPageMetacritic
