import React, {useState} from 'react';
function FormTareas(props) {
    
    const [tarea,setTarea] = useState(props.editar? props.tareaEditar : {nombre:'',duracion:0,completada:false});


    const agregarTarea = () => {
        console.log(props.editar);
        if(props.editar) {
            props.actualizarTarea(tarea);
        } else {
            props.guardarTarea(tarea)
        }
        
    }
    
    const handleChange = (evento) => {
        const nombreAtributo = evento.target.id;
        const valorAtributo = evento.target.type === 'checkbox' ? evento.target.checked :evento.target.value;
        setTarea(tarea => ({...tarea, [nombreAtributo]: valorAtributo}));
    }

    return (
        <div>
            <h1>{props.titulo}</h1>
            <form>
                <p>
                    Nombre:
                    <input type="text" id="nombre" value={tarea.nombre} onChange={handleChange}></input>
                </p>
                <p>
                    Duracion:
                    <input type="number" id="duracion" value={tarea.duracion} onChange={handleChange}></input>
                </p>
                <p>
                    Completada:
                    <input type="checkbox" id="completada" checked={tarea.completada} onChange={handleChange}></input>
                </p>
                <button type="button" onClick={agregarTarea} >Guardar</button>
            </form>
        </div>
    );
}

export default FormTareas;
