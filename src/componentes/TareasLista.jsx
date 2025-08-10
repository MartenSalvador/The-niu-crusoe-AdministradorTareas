import '../estilos/TareasLista.css' ;

function TareasLista({ tareas, onMarcarRealizada, onEliminarTarea }) {
    return(
        <ul className='lista-tareas'>
            {tareas.map((tarea) => (
                <li
                    key={tarea.id}
                    className={`tarea-item ${tarea.realizada ? 'realizada' : ''}`}
                    onClick={() =>{
                        console.log(`clic en tarea: `, tarea.id);
                        onMarcarRealizada(tarea.id)}
                    }
                         
                    >
                    <span>{tarea.texto}</span>
                    <button
                        className='boton-eliminar'
                        onClick={(e) =>{
                            e.stopPropagation();  //EVITA QUE SE MARQUE COMO REALIZADA
                            onEliminarTarea(tarea.id);
                        }}
                    >X</button>
                </li>
            ))}

        </ul>
    );

}


export default TareasLista;