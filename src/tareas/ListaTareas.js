import React, {useState} from 'react';
import './ListaTareas.css';

function ListaTareas(props) {

    const crearNuevaTarea = () => {
        props.crearTarea(true);
    };

    const eliminarTarea = (i) => {
        props.eliminarTarea(i);
    }

    const editarTarea = (i) => {
        props.editarTarea(i);
    }

    const listaTareas = props.lista.map( (elemento, indice) => {
        const clave = elemento.id ? elemento.id : indice;        
        return <tr key={clave}>
                        <td>{elemento.nombre}</td>
                        <td>{elemento.duracion}</td>
                        <td>{elemento.completada ? 'Terminada' : 'Pendiente'}</td>
                        <td>
                            <button type="button" onClick={() => editarTarea(indice)}>Editar</button>
                            <button type="button" onClick={() => eliminarTarea(indice)}>Borrar</button>
                        </td>
                    </tr>;
    });

    return (
        <div>
            <h1>{props.titulo}</h1>
            <table border="1" >
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Duracion</th>
                        <th>Completada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaTareas}
                </tbody>
            </table>
            <button onClick={crearNuevaTarea}>Nueva tarea</button>
        </div>
    );
}

export default ListaTareas;
