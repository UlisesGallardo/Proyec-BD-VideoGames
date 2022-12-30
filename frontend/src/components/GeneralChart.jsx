import React from 'react'
import { Bar, Pie , PolarArea, Radar} from 'react-chartjs-2';
import "./styles.css"

function Chart(props) {
    
    var datos = []
    props.informacion.ArreglodeObjetos.map((Objeto)=>{
        datos.push(Object.values(Objeto)[0])
    })

    console.log("Datos de grafica",datos)

    return (
        <div className="grafica">
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

              width={400}
              height={400}
              options={{maintainAspectRatio:false, responsive:true, indexAxis: 'y'}}
            />
        </div>
    )
}

export default Chart
