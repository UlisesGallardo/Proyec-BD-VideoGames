import { Container , Row, Col, Dropdown , DropdownButton, Card, Button } from 'react-bootstrap';
import TopCard from './TopCard';
import react, {useEffect, useState} from "react"
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import GeneralChart from "./GeneralChart"
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
    const [year, setYear] = useState((new Date()).getFullYear()-1)
    const [startDate, setStartDate] = useState(new Date("01-01-"+year))
    const [isOpen, setIsOpen] = useState(false);
    const [Games, setGames] = useState([]);

    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setStartDate(e);
    };
   

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
        const anio = d.getFullYear();
        console.log("Año:",anio);
        if(year!=d.anio){
            setStartDate(date);
            setIsOpen(false);
            setYear(anio);
            restart();
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const addDays = (date, days)  =>{
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    useEffect(()=>{

            
            console.log("Datos Local Storage", JSON.parse(localStorage.getItem("Datos")))

            if(localStorage.getItem("Datos"+(year)+"-"+(currentPage)) !== null){ //Valiar todos los datos
                restart();
                var datos = JSON.parse(localStorage.getItem("Datos"+(year)+"-"+(currentPage)));
                setDatos(datos);
                var top = JSON.parse(localStorage.getItem("Top"+(year)+"-"+(currentPage)));
                setTop(top);
                var nombres = JSON.parse(localStorage.getItem("Nombres"+(year)+"-"+(currentPage)));
                setNombres(nombres);
                var games = JSON.parse(localStorage.getItem("Games"+(year)+"-"+(currentPage)));
                setGames(games);
                setLoading(true);
            }else{
                        //var url = "http://localhost:8081/api/videojuegos/topMetacritic";
                        var url ="https://videogames-info.onrender.com/api/videojuegos/topMetacritic";

                        console.log("Año",year);
                        console.log("Page",currentPage);
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
                                Games.push(Objeto);
                                Datos.push({"PuntajeMetacritic":Objeto["metacritic"],
                                            "Nombre":Objeto["name"]})
                                
                                Nombres.push(Objeto["name"])

                                Top.push({"PuntajeMetacritic":Objeto["metacritic"]?Objeto["metacritic"]:"No puntuado",
                                        "Nombre":Objeto["name"],
                                        "AnioSalida":Objeto["released"],
                                        "Genero": Objeto["genres"].length ? Objeto["genres"][0]["name"] : "No definido",
                                        "url":Objeto["background_image"]})
                            })

                            localStorage.setItem("Datos"+(year)+"-"+(currentPage),JSON.stringify(Datos));
                            localStorage.setItem("Nombres"+(year)+"-"+(currentPage),JSON.stringify(Nombres));
                            localStorage.setItem("Top"+(year)+"-"+(currentPage), JSON.stringify(Top));
                            localStorage.setItem("Games"+(year)+"-"+(currentPage), JSON.stringify(Games));

                            setLoading(true);
                        }).catch((error) => {
                            console.log("Error", error);
                        })  

        }
    },[currentPage, year])

    return (
        <div width="100%">
            <br></br><br></br><br></br>
            <div className='d-flex justify-content-center'> <h1 className="display-1" style={{"fontSize":"4rem", color:"black"}}>Top Juegos Mejores Puntuados Metacritic {year}</h1></div>
            <Container className='mt-5 mb-5'>
            <Col ><h3>Filtros</h3>       
                        <Container  >
                                <Button variant="outline-info" onClick={handleClick}>
                                        Año {year}
                                </Button>                
                                {isOpen &&
                                     <DatePicker
                                     selected={startDate}
                                     onChange={(date) => yearCliked(date)}
                                     showYearPicker
                                     minDate={new Date(1970)}
                                     maxDate={new Date()}
                                     dateFormat="yyyy"
                                     placeholderText="1970-Actualidad"
                                     inline
                                 />
                                }
                               
                            </Container>
                        </Col>
                    </Container>

            <Container className='mt-5 mb-5'>
                {loading ? <div>
                        
                            <GeneralChart
                                    informacion = {{ArreglodeObjetos:  Datos,
                                    labels: Nombres, 
                                    titulo: "Mejores Puntajes", 
                                    colores:"green"}} 
                                />
                        
                    
                    <br></br>

                        <Row xs={1} md={2} className="g-4">
                            {
                                Top.map((Objeto, index)=>{
                                    {
                                    
                                            return <div key={index}>
                                                    <Col><TopCard Info = {Games[index]} Numero={(index+1 + (currentPage-1)*20)} Nombre={Objeto.Nombre} url={Objeto.url} Global={"Puntaje Metacritic: "+Objeto.PuntajeMetacritic} All={"Fecha de Salida: "+Objeto.AnioSalida+" Género: "+Objeto.Genero} /> </Col>                                       
                                            </div>
                                    
                                    }
                                    
                                })
                            }
                            
                        </Row> 

                       
                </div>
                : <div className='d-flex justify-content-center' ><ReactLoading className='d-flex justify-content-center'  type = {"bars"} color = {"#2E4053"} height={'10%'} width={'10%'} /></div>               
                }
            </Container>

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
        </div>
    )
}

export default TopPageMetacritic
