import React,{useEffect,useState} from 'react'
import Login from './login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AgregarEstudiantes from './estudiantes/AgregarEstudiantes';
import MainPage from './mainpage/MainPage';
import ListaEstudiantes from './estudiantes/ListaEstudiantes';
import Cuestionario from './cuestionario/Cuestionario';
function App() {

  return (
    <Routes>
      <Route path='/Ar-goPage' element={<Login/>} />
      <Route path='/main' element={<MainPage/>} />
      <Route path='/agregar-estudiante' element={<AgregarEstudiantes/>} />
      <Route path='/lista-estudiante' element={<ListaEstudiantes/>}/>
      <Route path='/cuestionario' element={<Cuestionario/>}/>
    </Routes>
  );
}

export default App;
