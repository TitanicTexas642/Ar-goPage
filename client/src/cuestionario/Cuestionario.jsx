import React, { Component,useState, useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router'
import CrearCuestionario from './CrearCuestionario'

function Cuestionario(){
    const location = useLocation();
    const { correoProfesor, nombreProfesor } = location.state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cuestionarios, setCuestionarios] = useState([]);
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleCreateCuestionario = (nuevoCuestionario) => {
      // Maneja la creación del cuestionario, por ejemplo, enviándolo al servidor
      // y luego cierra el modal
      // ...
  
      closeModal(); // Cierra el modal
    };

    const handleEntrarCuestionario = (cuestionario) => {
      // Implementa la lógica para entrar en el cuestionario aquí
      console.log('Entrando al cuestionario:', cuestionario.name_test);

    };

    useEffect(() => {
      // Realiza una solicitud GET para obtener los cuestionarios relacionados con el profesor
      fetch(`/cuestionarios?profesorCorreo=${correoProfesor}`) // Reemplaza con la URL correcta de tu servidor
        .then((response) => response.json())
        .then((data) => {
          console.log('Cuestionarios cargados:', data); // Agrega este console.log
          setCuestionarios(data);
        })
        .catch((error) => console.error('Error al obtener cuestionarios:', error));
    }, [nombreProfesor]);

    return (
      <div>
        <h2 style={{ color: 'navy' }}>Lista de Test personalizados de {nombreProfesor}</h2>
        <button onClick={openModal}>Crear Cuestionario</button>
        <div style={{ margin: '50px', width: '80%', marginTop: '10px' }}>
        <table style={{ borderCollapse: 'collapse', width: '110%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Número</th>
              <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Nombre del Cuestionario</th>
              <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Entrar</th>
              <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Editar</th>
            </tr>
          </thead>
          <tbody>
            {cuestionarios.map((cuestionario, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>{cuestionario.name_test}</td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>
                  <button onClick={() => handleEntrarCuestionario(cuestionario)}>Entrar</button>
                </td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>
                  <button onClick={() => handleEntrarCuestionario(cuestionario)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>
        {isModalOpen && (
          <CrearCuestionario onClose={closeModal} onCreate={handleCreateCuestionario} />
        )}
      </div>
    );
  }
export default Cuestionario;