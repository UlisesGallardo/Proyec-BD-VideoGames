import axios from 'axios';
import react,{useState} from "react"
import { Form, FormControl, Button, FormGroup, Row, Col } from 'react-bootstrap';
import TopCard from './TopCard';


function SearchForm() {

    const [Datos, setDatos] = useState([]);

    function getData() {

        var nombre = "Wii Sports";
        const columns = ["Nombre"];
        var orderby = "";
        var order = "";
    
        nombre = document.getElementById('Nombre').value
    
        if (document.getElementById('inline-checkbox-basicos-1').checked) columns.push("Genero");
        if (document.getElementById('inline-checkbox-basicos-2').checked) columns.push("Clasificacion");
        if (document.getElementById('inline-checkbox-basicos-3').checked) columns.push("AnioSalida");
        if (document.getElementById('inline-checkbox-basicos-4').checked) columns.push("Desarrollador.Nombre");
        if (document.getElementById('inline-checkbox-basicos-5').checked) columns.push("Plataforma.Nombre");
        if (document.getElementById('inline-checkbox-ventas-1').checked) columns.push("Ventas.VentasNorteAmerica");
        if (document.getElementById('inline-checkbox-ventas-2').checked) columns.push("Ventas.VentasUnionEuropea");
        if (document.getElementById('inline-checkbox-ventas-3').checked) columns.push("Ventas.VentasJapon");
        if (document.getElementById('inline-checkbox-ventas-4').checked) columns.push("Ventas.OtrasVentas");
        if (document.getElementById('inline-checkbox-ventas-5').checked) columns.push("Ventas.VentasGlobales");
        if (document.getElementById('inline-checkbox-puntaje-1').checked) columns.push("PuntajeMetacritic.UsuariosPositivas");
        if (document.getElementById('inline-checkbox-puntaje-2').checked) columns.push("PuntajeMetacritic.UsuariosNeutrales");
        if (document.getElementById('inline-checkbox-puntaje-3').checked) columns.push("PuntajeMetacritic.UsuariosNegativas");
        if (document.getElementById('inline-checkbox-puntaje-4').checked) columns.push("PuntajeMetacritic.CriticasPositivas");
        if (document.getElementById('inline-checkbox-puntaje-5').checked) columns.push("PuntajeMetacritic.CriticasNeutrales");
        if (document.getElementById('inline-checkbox-puntaje-6').checked) columns.push("PuntajeMetacritic.CriticasNegativas");
        if (document.getElementById('inline-checkbox-puntaje-7').checked) columns.push("PuntajeMetacritic.PuntajeUsuarios");
        if (document.getElementById('inline-checkbox-puntaje-8').checked) columns.push("PuntajeMetacritic.PuntajeMetacritic");
        
        //orderby = document.getElementById("OrdenC").value;
        //order = document.getElementById("OrdenAD").value;
    
        console.log(nombre,columns);
    
        // "select [columns] from Videojuego where Nombre like nombre% order by orderby order"
    
        axios({
            url: "http://localhost:8080/api/videojuegos/busqueda/"+nombre,
            method: "GET",
        })
        .then((response) => {
            setDatos(response.data.recordset)
            console.log(response)
        })
        .catch((error) => {
            console.log("Error", error);
        })
    }


    return (
        <div>
            <Form className="mb-3">
                <Row>
                    <Col sm = {11}>
                    <FormControl
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                        id = "Nombre"
                    />
                    </Col>
                    <Col sm = {1}>
                     <Button onClick={getData} variant="outline-info">Buscar</Button>
                    </Col>
                </Row>
                <h3 className='mt-4 mb-3'>Mostrar</h3>
                <FormGroup className='mb-4'>
                <div key={`inline-checkbox-basicos`} className="mb-3">
                        <Form.Check
                            inline
                            label="Género"
                            name="Basicos"
                            type='checkbox'
                            id={`inline-checkbox-basicos-1`}
                        />
                        <Form.Check
                            inline
                            label="Clasificación"
                            name="Basicos"
                            type='checkbox'
                            id={`inline-checkbox-basicos-2`}
                        />
                        <Form.Check
                            inline
                            label="Año"
                            name="Basicos"
                            type='checkbox'
                            id={`inline-checkbox-basicos-3`}
                        />
                        <Form.Check
                            inline
                            label="Desarrollador"
                            name="Basicos"
                            type='checkbox'
                            id={`inline-checkbox-basicos-4`}
                        />
                        <Form.Check
                            inline
                            label="Plataforma"
                            name="Basicos"
                            type='checkbox'
                            id={`inline-checkbox-basicos-5`}
                        />
                        </div>
                    <div key={`inline-checkbox-ventas`} className="mb-3">
                        <Form.Check
                            inline
                            label="Ventas Norte América"
                            name="Ventas"
                            type='checkbox'
                            id={`inline-checkbox-ventas-1`}
                        />
                        <Form.Check
                            inline
                            label="Ventas Unión Europea"
                            name="Ventas"
                            type='checkbox'
                            id={`inline-checkbox-ventas-2`}
                        />
                        <Form.Check
                            inline
                            label="Ventas Japón"
                            name="Ventas"
                            type='checkbox'
                            id={`inline-checkbox-ventas-3`}
                        />
                        <Form.Check
                            inline
                            label="Ventas Otros"
                            name="Ventas"
                            type='checkbox'
                            id={`inline-checkbox-ventas-4`}
                        />
                        <Form.Check
                            inline
                            label="Ventas Globales"
                            name="Ventas"
                            type='checkbox'
                            id={`inline-checkbox-ventas-5`}
                        />
                    </div>
                    <div key={`inline-checkbox-puntaje`} className="mb-3">
                        <Form.Check
                            inline
                            label="Usuarios Positivo"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-1`}
                        />
                        <Form.Check
                            inline
                            label="Usuarios Neutral"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-2`}
                        />
                        <Form.Check
                            inline
                            label="Usuarios Negativo"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-3`}
                        />
                        <Form.Check
                            inline
                            label="Críticas Positivo"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-4`}
                        />
                        <Form.Check
                            inline
                            label="Críticas Neutral"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-5`}
                        />
                        <Form.Check
                            inline
                            label="Críticas Negativo"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-6`}
                        />
                        <Form.Check
                            inline
                            label="Puntaje Usuarios"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-7`}
                        />
                        <Form.Check
                            inline
                            label="Puntaje Metacritic"
                            name="Puntaje"
                            type='checkbox'
                            id={`inline-checkbox-puntaje-8`}
                        />
                    </div>
                </FormGroup>
                {/*
                <h3 className='mt-4 mb-1'>Ordenar por</h3>
                <Row>
                    <Col>
                        <Form.Select className='mt-3' aria-label="Orden" id="OrdenC">
                            <option value="Nombre">Nombre</option>
                            <option value="Genero">Género</option>
                            <option value="Clasificacion">Clasificación</option>
                            <option value="AnioSalida">Año</option>
                            <option value="Desarrollador.Nombre">Desarrollador</option>
                            <option value="Plataforma.Nombre">Plataforma</option>
                            <option value="Ventas.VentasNorteAmerica">Ventas Norte América</option>
                            <option value="Ventas.VentasUnionEuropea">Ventas Unión Europea</option>
                            <option value="Ventas.VentasJapon">Ventas Japón</option>
                            <option value="Ventas.OtrasVentas">Ventas Otros</option>
                            <option value="Ventas.VentasGlobales">Ventas Globales</option>
                            <option value="PuntajeMetacritic.UsuariosPositivas">Usuarios Positivo</option>
                            <option value="PuntajeMetacritic.UsuariosNeutrales">Usuarios Neutral</option>
                            <option value="PuntajeMetacritic.UsuariosNegativas">Usuarios Negativo</option>
                            <option value="PuntajeMetacritic.CriticasPositivas">Críticas Positivo</option>
                            <option value="PuntajeMetacritic.CriticasNeutrales">Críticas Neutral</option>
                            <option value="PuntajeMetacritic.CriticasNegativas">Críticas Negativo</option>
                            <option value="PuntajeMetacritic.PuntajeUsuarios">Puntaje Usuarios</option>
                            <option value="PuntajeMetacritic.PuntajeMetacritic">Puntaje Metacritic</option>
                        </Form.Select>
                    </Col>
                    <Col sm = {2}>
                        <Form.Select className='mt-3' aria-label="Orden" id="OrdenAD">
                            <option value="Asc">Ascendente</option>
                            <option value="Desc">Descendente</option>
                        </Form.Select>
                    </Col>
                </Row>
                */}
            </Form>

            <h1 className='mt-5 mb-5'>Resultados</h1>

            {
                Datos && 
                Datos.map((Objetos, index)=>{
                    return <TopCard Numero={index+1} Nombre={Objetos.Nombre} Global={""} All={""} key = {index} className="mb-4"/>
                })
            }
        </div>
    )
}

export default SearchForm