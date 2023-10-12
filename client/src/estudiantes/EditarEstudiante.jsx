import React, { useState } from 'react';
import './modal.css';

function EditarEstudiante({ estudianteEditado, onClose, onSave }) {
  // Estados locales para los valores de los campos de entrada
  const [nombre, setNombre] = useState(estudianteEditado.name_student || '');
  const [curso, setCurso] = useState(estudianteEditado.course || '');
  const [rut, setRut] = useState(estudianteEditado.rut || '');
  const [error, setError] = useState(null);


  // Manejadores de cambio para los campos de entrada
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCursoChange = (e) => {
    setCurso(e.target.value);
  };

  const handleRutChange = (e) => {
    setRut(e.target.value);
  };

  // Manejador para guardar los cambios
  const handleSave = () => {
    // Crear un objeto con los valores actualizados
    const estudianteActualizado = {
      name_student: nombre,
      course: curso,
      rut: rut,
      // Otros campos aquí si es necesario
    };

    // Llamar a la función onSave con el estudiante actualizado
    fetch(`/estudiantes/${estudianteEditado._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudianteActualizado),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(() => {
        // Limpia el error si la operación es exitosa
        setError(null);
        onClose(); // Cierra el modal
      })
      .catch((error) => {
        // Manejo de errores: muestra el error al usuario
        setError(error.message || 'Error al guardar los cambios');
      });
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <h3>Editar Estudiante</h3>
        <form>
          <div className="input-container">
            <label>Nombre: </label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
            />
          </div>
          <div className="input-container">
            <label>Curso: </label>
            <input
              type="text"
              value={curso}
              onChange={handleCursoChange}
            />
          </div>
          <div className="input-container">
            <label>Rut: </label>
            <input
              type="text"
              value={rut}
              onChange={handleRutChange}
            />
          </div>
          <div className="button-container">
          {/* Agrega más campos aquí si es necesario */}
          <button type="button" onClick={handleSave}>Guardar Cambios</button>
          </div>
          <div className="button-container">
          <button type="button" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default EditarEstudiante;
