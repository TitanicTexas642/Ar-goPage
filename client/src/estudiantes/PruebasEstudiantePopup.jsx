import React, { useEffect, useState } from 'react';
import './PruebasEstudiantePopup.css';

function PruebasEstudiantePopup({ estudiante,prueba, onClose}) {
  const [pruebas, setPruebas] = useState([]);
  useEffect(() => {
    // Realiza una solicitud al servidor para obtener las pruebas del estudiante por su Rut
    fetch(`/pruebas?rutEstudiante=${estudiante.rut}`)
      .then((response) => {
        console.log('Respuesta recibida del servidor:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Datos de pruebas recibidos:', data);
        console.log(estudiante.rut);
        setPruebas(data);
      })
      .catch((error) => console.error('Error al recuperar pruebas:', error));
  }, [estudiante.rut]);

  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [selectedPruebaId, setSelectedPruebaId] = useState('');
  const [textoBoton, setTextoBoton] = useState('');


  const handleCambiarValorPrueba = async (propiedad, nuevoValor) => {
    try {
      // Realiza una solicitud PATCH al servidor para actualizar la propiedad con el nuevo valor
      const response = await fetch(`/actualizar-propiedad/${pruebas[0]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propiedad, nuevoValor }),
      });
  
      if (response.ok) {
        // Actualización exitosa, puedes actualizar el estado local si es necesario
        // Por ejemplo, si deseas actualizar el valor en el estado local de pruebas
        const nuevasPruebas = [...pruebas];
        nuevasPruebas[0][propiedad] = nuevoValor;
        setPruebas(nuevasPruebas);
        console.log(nuevasPruebas)
      } else {
        // Manejar errores si es necesario
        console.error('Error al cambiar el valor de la propiedad', propiedad);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  
  return (
  <div>
  <div className="popup">
    <div className="popup-content">
      <h2>Pruebas de {estudiante.name_student}</h2>
      {pruebas && pruebas.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <td><strong>Aritmética</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('aritmetica', pruebas[0].aritmetica === '0' ? '1' : '0')}>
                  {pruebas[0].aritmetica === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Balanza</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('balanza', pruebas[0].balanza === '0' ? '1' : '0')}>
                  {pruebas[0].balanza === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Cubos</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('cubos', pruebas[0].cubos === '0' ? '1' : '0')}>
                  {pruebas[0].cubos === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Información</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('informacion', pruebas[0].informacion === '0' ? '1' : '0')}>
                  {pruebas[0].informacion === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Letras y Números</strong></td>
              <td>
              <button onClick={() => handleCambiarValorPrueba('letras_numeros', pruebas[0].letras_numeros === '0' ? '1' : '0')}>
                {pruebas[0].letras_numeros === '0' ? 'Habilitar' : 'Deshabilitar'}
              </button>
              </td>
            </tr>
            <tr>
              <td><strong>Matrices</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('matrices', pruebas[0].matrices === '0' ? '1' : '0')}>
                  {pruebas[0].matrices === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Puzzles</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('puzzles', pruebas[0].puzzles === '0' ? '1' : '0')}>
                  {pruebas[0].puzzles === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Semejanzas</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('semejanzas', pruebas[0].semejanzas === '0' ? '1' : '0')}>
                  {pruebas[0].semejanzas === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Claves</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('claves', pruebas[0].claves === '0' ? '1' : '0')}>
                  {pruebas[0].claves === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Cancelacion</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('cancelacion', pruebas[0].cancelacion === '0' ? '1' : '0')}>
                  {pruebas[0].cancelacion === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Vocabulario</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('vocabulario', pruebas[0].vocabulario === '0' ? '1' : '0')}>
                  {pruebas[0].vocabulario === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Digitos</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('digitos', pruebas[0].digitos === '0' ? '1' : '0')}>
                  {pruebas[0].digitos === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Simbolos</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('simbolos', pruebas[0].simbolos === '0' ? '1' : '0')}>
                  {pruebas[0].simbolos === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Comprension</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('comprension', pruebas[0].comprension === '0' ? '1' : '0')}>
                  {pruebas[0].comprension === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            <tr>
              <td><strong>Span</strong></td>
              <td>
                <button onClick={() => handleCambiarValorPrueba('span', pruebas[0].span === '0' ? '1' : '0')}>
                  {pruebas[0].span === '0' ? 'Habilitar' : 'Deshabilitar'}
                </button>
              </td>
            </tr>
            {/* Agrega más propiedades de la prueba aquí */}
          </tbody>
        </table>
      ) : (
        <p>No hay pruebas disponibles para mostrar.</p>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
  </div>
);

}

export default PruebasEstudiantePopup;
