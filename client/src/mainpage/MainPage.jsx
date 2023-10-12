import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  //const correoProfesor = queryParams.get('correoProfesor');
  const { correoProfesor, nombreProfesor } = location.state;
  const redirectToStudentList = () => {
    navigate('/lista-estudiante', {
      state: { correoProfesor, nombreProfesor }, // Pasa las variables en location.state
    });
  };
  const redirectToAddStudent = () => {
    navigate('/agregar-estudiante',{
      state: {correoProfesor,nombreProfesor},
    });
  }
  return (
    <div>
      <h1>Bienvenido a la página principal {nombreProfesor}</h1>

      {/* <AgregarEstudiantes correoProfesor={correoProfesor} /> */}
      <button onClick={redirectToAddStudent}> Agregar estudiantes </button>
      <button onClick={redirectToStudentList}>Ver Lista de Estudiantes</button>
      {/* Aquí puedes mostrar la lista de estudiantes si lo deseas */}
    </div>
  );
}

export default MainPage;
