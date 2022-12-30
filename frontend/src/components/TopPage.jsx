import { Container , Row, Col} from 'react-bootstrap';
import TopCard from './TopCard';
import react, {useEffect, useState} from "react"
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Chart from "./Chart"
import ReactLoading from 'react-loading';
import dotenv from "dotenv";



function TopPage() {
    dotenv.config();

    const location = useLocation();
    const [Top, setTop] = useState([])
    const [loading, setLoading] = useState(false)
    const [Nombres, setNombres] = useState([])
    const [Datos, setDatos] = useState([])

    useEffect(()=>{
        if(location.state){

            var url = ''
            //console.log("URL", url)
            var flag = location.state.top
            if(location.state.top){
                //url = "http://localhost:8081/api/videojuegos/topVentas"
                url = "https://videogames-info.onrender.com/api/videojuegos/topVentas";
            }else{
                //url = process.env.URL_SERVER+"api/videojuegos/topPuntaje"
                url = "http://localhost:8081/api/videojuegos/topPuntajeMetacritic"; 
            }

            axios({
                url: url,
                method: "GET",
            })
            .then((response) => {
                //setTop(response.data)       //Maps https://flaviocopes.com/javascript-data-structures-map/
                
                console.log("url usada:",url," datos desde TopPage", response.data);

                const m = new Map()
                response.data.map((Objeto)=>{
                    m.set(Objeto.Nombre, Objeto)
                })
                
                var contador = 1;
                for (const v of m.values()) {
                    if(contador<=50)Nombres.push(   (contador))

                    if(flag){
                        Datos.push((({ VentasGlobales, Nombre}) => ({ VentasGlobales, Nombre}))(v))
                    }else{
                        Datos.push((({ PuntajeMetacritic, Nombre}) => ({ PuntajeMetacritic, Nombre}))(v))
                    }
                    Top.push(v);
                    contador+=1;
                }
                setLoading(true);
            }).catch((error) => {
                console.log("Error", error);
            })
        }
    },[location.state ? location.state.top : location.key])

    {
        if(loading == false) return <div className='d-flex justify-content-center' ><ReactLoading className='d-flex justify-content-center'  type = {"bars"} color = {"#2E4053"} height={'10%'} width={'10%'} /></div>
    }

    return (
        <div>
            <Container className='mt-5 mb-5'>
                
                {
                 loading && location.state && Datos && location.state.top != null &&
                    <Chart
                        informacion = {{ArreglodeObjetos:  Datos,
                        labels: Nombres, 
                        titulo: location.state.top ? 'Ventas Globales' : "Mejores Puntajes", 
                        colores:'blue'}} 
                        flag = {location.state.top}
                    />
                }
                {loading && <Row xs={1} md={2} className="g-4">
                    {
                        Top.map((Objeto, index)=>{
                            return <div key={index}>
                                    {
                                        index+1 <= 50 && index+1 >=1 && <Col><TopCard Numero={index+1} Nombre={Objeto.Nombre} Global={Objeto.VentasGlobales ? "Ventas Globales: "+Objeto.VentasGlobales : "Puntaje Metacritic: "+Objeto.PuntajeMetacritic} All={"Fecha de Salida: "+Objeto.AnioSalida+" Género: "+Objeto.Genero} /> </Col>
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

export default TopPage
