import '../estilos/TareasFormulario.css';
import { useState } from 'react';

function TareasFormulario({ onAgregarTarea }) {
    
    const [texto, setTexto] = useState('');

    const manejarCambio = (e) => {
        setTexto(e.target.value);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (texto.trim() !== '') {
            onAgregarTarea(texto.trim());
            setTexto('');
        }
    };



    return(
        <form className='formulario' onSubmit={manejarEnvio}>
            <input
                type="text"
                id="nueva-tarea"
                name="nueva-tarea"
                autoComplete='off'
                className='input-tarea'
                value={texto}
                placeholder='Agregar nueva tarea...'
                onChange={manejarCambio}
                />
            <button className='boton-agregar'>Agregar</button>

        </form>
    )
}


export default TareasFormulario;