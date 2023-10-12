import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import EditarEstudiante from './EditarEstudiante';
import PruebasEstudiantePopup from './PruebasEstudiantePopup';
import logo from '../login/logo.png'

function ListaEstudiantes() {
  const location = useLocation();
  const { correoProfesor, nombreProfesor } = location.state; // Obtiene las variables desde location.state
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteEditado, setEstudianteEditado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEstudianteForPruebas, setSelectedEstudianteForPruebas] = useState(null);
  const [showPruebasPopup,setShowPruebasPopup] =useState(false)



  useEffect(() => {
    // Utiliza correoProfesor en tu solicitud para filtrar los estudiantes asociados al profesor
    fetch(`/estudiantes?profesorCorreo=${correoProfesor}`)
      .then((response) => {
        console.log('Respuesta recibida del servidor:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Datos de estudiantes recibidos:', data);
        setEstudiantes(data);
      })
      .catch((error) => console.error('Error al recuperar estudiantes:', error));
  }, [correoProfesor]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // -1 indica retroceder una página en el historial
  };
  const handleEditarEstudiante = (estudianteId) => {
    // Encuentra el estudiante que se está editando en la lista de estudiantes
    const estudiante = estudiantes.find((est) => est._id === estudianteId);
    setEstudianteEditado(estudiante);
    setShowModal(true);
  };
  const handleSaveEstudiante = (updatedEstudiante) => {
    // Aquí puedes enviar una solicitud al servidor para guardar los cambios en el estudiante
    // Luego, actualiza la lista de estudiantes y cierra el modal
    // ...
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const logout = () =>{
    navigate('/')
  }
  const handleVerPruebasEstudiante = (estudiante) => {
    setSelectedEstudianteForPruebas(estudiante);
    setShowPruebasPopup(true);
  };
  return (
  <div style={{backgroundColor: 'lightgray',padding: '20px',overflowY: 'auto',backgroundSize: 'cover',backgroundSize:'cover'}}>
    <h2 style={{ color: 'navy' }}>Lista de Estudiantes de {nombreProfesor}</h2>
    <img
      src={logo}
      alt="Volver Atrás"
      onClick={goBack}
      style={{
        position: 'relative',
        // Ajusta la posición vertical según sea necesario
        left: '50px', // Ajusta la posición horizontal según sea necesario
        width: '100px', // Ajusta el tamaño según sea necesario
        height: 'auto',
      }}
    />
    <div style={{ margin: '50px', width: '80%', marginTop: '10px' }}>
      <table style={{ borderCollapse: 'collapse', width: '110%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Nombre</th>
            <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Curso</th>
            <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Rut</th>
            <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Editar datos</th>
            <th style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>Editar pruebas</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante._id}>
              <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>{estudiante.name_student}</td>
              <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>{estudiante.course}</td>
              <td style={{ border: '1px solid black', padding: '8px', color: 'navy' }}>{estudiante.rut}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleEditarEstudiante(estudiante._id)}>Editar datos</button>
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleVerPruebasEstudiante(estudiante)}>Editar pruebas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout}></button>
    </div>
    {showModal && (
      <EditarEstudiante
        estudianteEditado={estudianteEditado}
        onClose={handleCloseModal}
        onSave={handleSaveEstudiante}
      />
    )}
    {showPruebasPopup && (
      <PruebasEstudiantePopup
        estudiante={selectedEstudianteForPruebas}
        onClose={() => setShowPruebasPopup(false)}
      />
    )}
  </div>
);

}

export default ListaEstudiantes;
