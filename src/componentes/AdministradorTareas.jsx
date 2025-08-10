import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, serverTimestamp } from '../firebase';
import TareasFormulario from './TareasFormulario';
import TareasLista from './TareasLista';
import Header from './Header';
import '../estilos/AdministradorTareas.css';

function AdministradorTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'tareas'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        setTareas(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      },
      error => {
        console.error('Firestore Listen error:', error);
      }
    );
    return () => unsubscribe();
  }, []);

  const agregarTarea = async texto => {
    try {
      const docRef = await addDoc(collection(db, 'tareas'), {
        texto,
        realizada: false,
        createdAt: serverTimestamp()
      });
      console.log('Tarea guardada con ID:', docRef.id);
    } catch (err) {
      console.error('Error al agregar tarea:', err);
    }
  };

  const marcarRealizada = async id => {
    const ref = doc(db, 'tareas', id);
    const t = tareas.find(t => t.id === id);
    await updateDoc(ref, { realizada: !t.realizada });
  };

  const eliminarTarea = async id => {
    await deleteDoc(doc(db, 'tareas', id));
  };

  return (
    <div className='administrador-tareas'>
      <Header />
      <h2 className='administrador-titulo'>Administrador de tareas</h2>
      <TareasFormulario onAgregarTarea={agregarTarea} />
      <TareasLista
        tareas={tareas}
        onMarcarRealizada={marcarRealizada}
        onEliminarTarea={eliminarTarea}
      />
    </div>
  );
}

export default AdministradorTareas;
