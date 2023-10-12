import React,{useEffect,useState} from 'react'
import Login from './login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AgregarEstudiantes from './estudiantes/AgregarEstudiantes';
import MainPage from './mainpage/MainPage';
import ListaEstudiantes from './estudiantes/ListaEstudiantes';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/main' element={<MainPage/>} />
      <Route path='/agregar-estudiante' element={<AgregarEstudiantes/>} />
      <Route path='/lista-estudiante' element={<ListaEstudiantes/>}/>
    </Routes>
  );
}

export default App;
