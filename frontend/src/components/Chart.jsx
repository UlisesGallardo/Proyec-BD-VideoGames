import React from 'react'
import { Bar as BarJS } from 'chart.js/auto' //Importante agregar https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale
import { Bar } from 'react-chartjs-2';
import "./styles.css"

function Chart(props) {

    var datos = []

    if(props.informacion.data != null){
        for (const item in props.informacion.data) {
            if(item.includes("Negativas")){
                datos.push(-1*parseInt(props.informacion.data[item], 10))
            }else if(item!="VentasGlobales"){
                datos.push(props.informacion.data[item])
            }
        }
    }else{
        console.log(props.informacion.ArreglodeObjetos)
        console.log("valor de flag", props.flag)
        props.informacion.ArreglodeObjetos.map((Objeto)=>{
            if(props.flag){
                datos.push(Objeto.VentasGlobales)
            }else{
                datos.push(Objeto.PuntajeMetacritic)
            }
            
        })
    }
    

    return (
        <div className="grafica">
            <Bar
            data={                
                {
                labels: props.informacion.labels,
                datasets: [
                    {
                      id: 1,
                      label: props.informacion.titulo,
                      data: datos,
                      backgroundColor: props.informacion.colores,
                    }
                  ],
              }}

              width={300}
              height={300}
              options={{maintainAspectRatio:false}}
            />
        </div>
    )
}

export default Chart
