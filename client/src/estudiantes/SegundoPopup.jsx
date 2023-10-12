import React, { useState } from 'react';

function SegundoPopup({ pruebaId, onClose }) {
  const [newValue, setNewValue] = useState('');

  const handleCambiarValor = async (newValue) => {
    console.log(pruebaId)
    try {
      const response = await fetch(`/pruebas/${pruebaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newValue }),
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes cerrar el segundo popup
        onClose();
      } else {
        // Manejar errores si es necesario
        console.error('Error al cambiar el valor');
        console.log(pruebaId);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Habilitar prueba para el estudiante</h2>
        <button onClick={() => handleCambiarValor('1')}>Habilitar</button>
        <button onClick={() => handleCambiarValor('0')}>Deshabilitar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default SegundoPopup;
