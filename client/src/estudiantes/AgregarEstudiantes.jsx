import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function AgregarEstudiantes({ students, setStudents}) {
  const [name_student, setNombre] = useState('');
  const [course, setCurso] = useState('');
  const [id_teacher, setProfesorId] = useState('');
  const [rut, setRut] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  const { correoProfesor, nombreProfesor } = location.state || {};
  const goBack = () => {
    navigate(-1); // -1 indica retroceder una página en el historial
  };
  useEffect(() => {
    // Recupera la lista de estudiantes al cargar el componente
    // Utiliza correoProfesor en tu solicitud para filtrar los estudiantes asociados al profesor
    fetch(`/agregar-estudiante?profesorCorreo=${correoProfesor}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error al recuperar profesor:', error));
  }, [correoProfesor,setStudents]);


  const handleAgregarEstudiante = async () => {
    if (name_student && course && rut) {
      try {
        const response = await fetch('/agregar-estudiante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name_student, id_teacher:correoProfesor, course, rut }),
        });

        if (response.ok) {
          const nuevoEstudiante = await response.json();
          setStudents([...students, nuevoEstudiante]);
          console.log(nuevoEstudiante)
          // Limpia los campos del formulario
          setNombre('');
          setCurso('');
          setRut('');
        } else {
          // Manejar errores de solicitud, como autenticación o errores de servidor
        }
      } catch (error) {
        console.error('Error de cuenta:', error);
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };
  return (
    <div>
      <h2>Agregar Estudiantes de {nombreProfesor}</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={name_student}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="curso">Curso:</label>
        <input
          type="text"
          id="curso"
          value={course}
          onChange={(e) => setCurso(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rut">RUT:</label>
        <input
          type="text"
          id="rut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleAgregarEstudiante}>Agregar Estudiante</button>
        <button onClick={goBack}>Volver Atrás</button>
      </div>
    </div>
  );
}

export default AgregarEstudiantes;
