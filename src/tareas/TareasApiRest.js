/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react';
import ListaTareas from './ListaTareas';
import FormTareas from './FormTareas';

const SERVER_URL = 'http://localhost:5000/';
const RECURSO_TAREAS = 'tareas';

const getEndpoint = () => SERVER_URL + RECURSO_TAREAS;

function TareasApiRest() {
    const [modoAlta,setModoAlta] = useState(false);
    const [modoEditar,setModoEditar] = useState(false);
    const [listaTareas,setListaTareas] = useState([]);
    const [tareaActual,setTareaActual] = useState({});

    const [recargar,setRecargar] = useState(true);
    useEffect(() => {
        const funcionBuscarRest = () => {
            fetch(getEndpoint()).then( (response) => {
                return response.json();
            }).then( (data) => {
                setListaTareas(l => [...data]);
                setRecargar(false);
            })            
        }
        if(recargar){
            funcionBuscarRest();
        }
    },[recargar]);

    const [alta,setAlta] = useState(false);
    const doAddNuevaTarea = (tarea) => {
        console.log('doAddNuevaTarea',tarea);
        setTareaActual(tarea);
        setAlta(true);
    }

    const doNuevaTarea = (valor) => {
        setModoAlta(valor);
        setModoEditar(false);
    }

    useEffect ( () => {
        const funcionPostRest = (tarea) =>{
            fetch(getEndpoint(),{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(tarea)
            }).then( (response) => {
                return response.json();
            }).then( (data) => {
                setListaTareas(l => [...l,data]);
                setAlta(false);
                setModoAlta(false);
            })
        }
        console.log('alta',alta);

        if(alta){
            funcionPostRest(tareaActual);
        }
    },[alta]);


    const [actualizar,setActualizar] = useState(false);

    useEffect ( () => {
        const funcionPutRest = (tarea) =>{
            fetch(getEndpoint()+"/"+tarea.id,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(tarea)
            }).then( (response) => {
                return response.json();
            }).then( (data) => {
                const listaNueva = listaTareas.map( e => {
                    if(e.id === data.id) return data ;
                    else return e;
                });
                setActualizar(false);
                setListaTareas(listaNueva);
                setModoEditar(false);
            })
        }
        console.log('actualizar',actualizar);

        if(actualizar){
            funcionPutRest(tareaActual);
        }
    },[actualizar]);

    const doUpdateTarea = (tarea) => {
        console.log('doUpdateTarea',tarea);
        setTareaActual(tarea);
        setActualizar(true);
    }

    const doBorrarTarea = (indice) => {
        console.log(listaTareas);
        const nuevoArreglo = listaTareas.slice(0,indice).concat(listaTareas.slice(indice+1));
        console.log(nuevoArreglo);
        setListaTareas(nuevoArreglo);
    }

    const doEditarTarea = (indice) => {
        setTareaActual({...listaTareas[indice]});
        setModoEditar(true);
        setModoAlta(false);
    }

    const estilo = {
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center'
    }

    // definimos una función que lee la variable modoAlta y muestra uno u otro
    const contenido = ()=> 
        {
            if(modoAlta || modoEditar){
                const titulo = modoAlta ? 'Nueva Tarea' : ' Editar tarea ';
                return <FormTareas titulo={titulo}  
                                        editar={modoEditar}
                                        guardarTarea={doAddNuevaTarea}
                                        actualizarTarea={doUpdateTarea}
                                        tareaEditar={tareaActual} >
                        </FormTareas>
            } else {
                return <ListaTareas titulo="Listado de Tareas" crearTarea={doNuevaTarea} 
                                    editarTarea={doEditarTarea}
                                    eliminarTarea={doBorrarTarea}
                                    lista={listaTareas} ></ListaTareas>
            }
        };

    return (
        <div style={estilo}>
            { contenido()}
        </div>
    );
}

export default TareasApiRest;
