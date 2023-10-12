import React, { useState } from 'react'
import './Login.css';
import logo from './logo.png'
import { Route,Routes,useNavigate} from 'react-router-dom'

const Login = () => {
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
              // Autenticación exitosa, redirige a la página principal o realiza alguna acción
              const user =await response.json();
              console.log(user)
              const profesorCorreo = email;
              const profesorNombre = user;
              //navigate(`/main?correoProfesor=${profesorCorreo}&nombreProfesor=${profesorNombre}`)
              navigate('/main', { state: { correoProfesor: profesorCorreo, nombreProfesor: profesorNombre } });
            } else {
              // Autenticación fallida, muestra un mensaje de error'
              console.error('Error de autenticación:', response.status);
            }
          } catch (error) {
            console.error('Error de cuenta:', error);
          }
    };
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="Login.css" />
        <title>Ingresar</title>
        <div className="container">
            <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <form className="login-form" action="/login" method="POST">
                <label for="username">Usuario:</label>
                <input type="text" id="email" name="email" required placeholder="ejemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}  />
                <button type="submit" class="button-container" onClick={handleSubmit} >Ingresar</button>
            </form>
            <h4>¿No tienes cuenta?</h4>
            <a href="https://ar-go.feriadesoftware.cl/contact.html">Contáctanos</a>
            </div>
        </div>
      </div>

    )
}


export default Login;

