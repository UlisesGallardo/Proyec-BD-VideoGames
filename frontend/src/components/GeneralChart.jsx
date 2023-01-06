import React from 'react'
import { Bar, Pie , PolarArea, Radar} from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import "./styles.css"

function allAreNull(arr) {
    let result = true;
  
    for (const value of arr) {
      if (value !== null) {
        result = false;
        break;
      }
    }
  
    return result;
  }

function Chart(props) {
    
    var datos = []
    props.informacion.ArreglodeObjetos.map((Objeto)=>{
        datos.push(Object.values(Objeto)[0])
    })

    const width = window.innerWidth;

    console.log("Datos de grafica",datos)
    console.log("Width pantalla", width);

    if ( width <468)return (<></>);

    return (
            <>
                    {!allAreNull(datos)?
                    <article style={{height:"60vh"}}>
                        <Radar
                            data={                
                                {
                                labels: props.informacion.labels,
                                datasets: [
                                    {
                                    id: 1,
                                    label: props.informacion.titulo,
                                    data: datos,
                                    //backgroundColor: props.informacion.colores,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    }
                                ],
                            }}
                            
                            options={{responsive: true,
                            maintainAspectRatio: false,}}

                        /> 
                        </article>: <h1>No hay suficientes puntuaciones</h1>
                    }
        </>
    )
}

export default Chart
