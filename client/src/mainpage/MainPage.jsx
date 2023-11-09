import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../login/logo.png';
import monito_bordes from './monito_bordes.png';
import argo_banner from './argo_banner.png';
import './MainPage.css'; // Importa el archivo CSS

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correoProfesor, nombreProfesor } = location.state;

  const redirectToStudentList = () => {
    navigate('/lista-estudiante', {
      state: { correoProfesor, nombreProfesor },
    });
  };

  const redirectToAddStudent = () => {
    navigate('/agregar-estudiante', {
      state: { correoProfesor, nombreProfesor },
    });
  };

  const redirectToCuestionario = () => {
    navigate('/cuestionario', {
      state: { correoProfesor, nombreProfesor },
    });
  };
  const logout = () =>{
    navigate('/Ar-goPage/')
  };

  return (
    <div>
      <div className='background'>
        <div className="left-column">
          <img src={monito_bordes} alt="Monito Bordes" className="image monito-image" />
          <img src={argo_banner} alt="Argo Banner" className="image argo-image" /> 
        </div>
        <div className="right-column">
          <button className="button" onClick={redirectToCuestionario}>
            Cuestionario
          </button>
          <button className="button" onClick={redirectToStudentList}>
            Ver Lista de Estudiantes
          </button>
          <button className="button" onClick={redirectToAddStudent}>
            Agregar estudiantes
          </button>
          <button className='logout-button' onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <div class="content">
        <img src={logo} alt='logo' className="footer-logo" />
        <p>Tu apoyo digital para necesidades psicopedagogicas</p>
      </div>
      <div className='footer'></div>
    </div>
  );
}

export default MainPage;
