import React, { useState , useEffect } from 'react'
import '../estilos/Habitaciones.css'
import Header from './Header'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, serverTimestamp } from '../firebase';

function Habitaciones() {
  // 1. Estado para el input y para la lista
  const [nombre, setNombre] = useState('');
  const [formularios, setFormularios] = useState([]);
  const [openForms, setOpenForms] = useState({});
  const [openPisos, setOpenPisos] = useState({});

  useEffect(() => {
      const colRef = collection(db, 'formularios');
      const unsubscribe = onSnapshot(colRef, snapshot => {
        setFormularios(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );
      });
      return () => unsubscribe();
    }, []);

  // 2. Crear un formulario nuevo
  const crear = async () => {
    if (!nombre.trim()) return;
    await addDoc(collection(db, 'formularios'), {
      nombre: nombre.trim(),
      checks: {},
      createdAt: serverTimestamp()
    });
    setNombre(''); // Limpiar el input
  };

  // 3. Alternar despliegue de pisos
 const toggleFormulario = formId => {
    setOpenForms(prev => ({ ...prev, [formId]: !prev[formId] }));
  };


  // 4. Alternar despliegue de un piso específico
  //    dentro de un formulario

  const togglePiso = (formId, pisoNum) => {
      setOpenPisos(prev => ({
        ...prev,
        [formId]: {
          ...prev[formId],
          [pisoNum]: !prev[formId]?.[pisoNum]
        }
      }));
    };

  //5. Eliminar un formulario
  const eliminarFormulario = async formId => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este formulario?');
    if (!confirmar) return;
    await deleteDoc(doc(db, 'formularios', formId));
  };


  return (
    
    <div className="check-container">
      <Header />
      <h2 className="habitaciones-titulo">Formularios</h2>

      {/* Input para crear un nuevo formulario */}
      <div className="formulario-crear">
        <input
          className="formulario-input"
          type="text"
          name='nombre'
          id='nombre'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre del formulario"
        />
        <button className="formulario-boton" onClick={crear}>
          Crear
        </button>
      </div>

      {/* Lista de formularios */}
      <ul className="lista-formularios">
        {formularios.map(f => (
          <li key={f.id}>
            <div className="formulario-item">
              <div
                className="titulo-form"
                onClick={() => toggleFormulario(f.id)}
              >
                {f.nombre}
              </div>
              <button
                className="boton-eliminar"
                onClick={() => eliminarFormulario(f.id)}
              >
                X
              </button>
            </div>

            {/* Mostrar pisos solo si el formulario está abierto */}
            {openForms[f.id] && (
              <ul className="lista-pisos">
                {[1, 2, 3, 4, 5, 6].map(piso => (
                  <li className="habitaciones-li" key={piso}>
                    <div
                      className="piso-titulo"
                      onClick={() => togglePiso(f.id, piso)}
                    >
                      Piso {piso}{' '}
                      {openPisos[f.id]?.[piso] ? '▲' : '▼'}
                    </div>

                    {/* Renderizar componente Piso si el piso está abierto */}
                    {openPisos[f.id]?.[piso] && (
                      <Piso
                        formId={f.id}
                        numero={piso}
                        checks={f.checks}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para renderizar los checkboxes de cada piso
function Piso({ formId, numero, checks }) {
  // Cálculo de números de habitación
  const inicio = numero * 100 + 1;
  let cantidad;
  if (numero === 5) cantidad = 18;
  else if (numero === 6) cantidad = 17;
  else cantidad = 29;

  const habitaciones = Array.from(
    { length: cantidad },
    (_, i) => inicio + i
  );

  // Persistir cambios de cada checkbox en Firestore
  const toggleRoom = async num => {
    const ref = doc(db, 'formularios', formId);
    await updateDoc(ref, {
      [`checks.${num}`]: !checks?.[num]
    });
  };

  return (
    <div className="piso">
      <h4>{numero}° piso</h4>
      <div className="habitaciones">
        {habitaciones.map(num => (
          <label key={num}>
            <input
              type="checkbox"
              checked={!!checks?.[num]}
              onChange={() => toggleRoom(num)}
            />
            {num}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Habitaciones;
