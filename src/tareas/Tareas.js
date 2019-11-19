import React, {useState,useEffect} from 'react';
import ListaTareas from './ListaTareas';
import FormTareas from './FormTareas';

function Tareas() {
    const [modoAlta,setModoAlta] = useState(false);
    const [modoEditar,setModoEditar] = useState(false);
    const [indiceEditar,setIndiceEditar] = useState(-1);
    const [listaTareas,setListaTareas] = useState([]);

    // este hook se ejecuta siempre
    useEffect(() => {
        document.title = `Tareas ${listaTareas.length}`;
    });

    const doNuevaTarea = (valor) => {
        setModoAlta(valor);
        setModoEditar(false);
    }

    const doAddNuevaTarea = (tarea) => {
        setListaTareas([...listaTareas,tarea]);
        setModoAlta(false);
    }

    const doUpdateTarea = (tarea) => {
        const nuevaLista = [...listaTareas];
        console.log('actualizar',tarea,indiceEditar);
        nuevaLista[indiceEditar] = tarea;
        setListaTareas(nuevaLista);
        setModoAlta(false);
        setModoEditar(false);

    }

    const doBorrarTarea = (indice) => {
        console.log(listaTareas);
        const nuevoArreglo = listaTareas.slice(0,indice).concat(listaTareas.slice(indice+1));
        console.log(nuevoArreglo);
        setListaTareas(nuevoArreglo);
    }

    const doEditarTarea = (indice) => {
        setModoEditar(true);
        setModoAlta(false);
        setIndiceEditar(indice);
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
                const tareaEditar = indiceEditar >=0 ? listaTareas[indiceEditar] : {};
                return <FormTareas titulo={titulo}  
                                        editar={modoEditar}
                                        guardarTarea={doAddNuevaTarea}
                                        actualizarTarea={doUpdateTarea}
                                        tareaEditar={tareaEditar} >
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

export default Tareas;
