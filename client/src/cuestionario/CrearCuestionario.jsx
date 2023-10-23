import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function CrearCuestionario({ onClose }) {
  const [name_test, setName_test] = useState('');
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswers, setCorrectAnswers] = useState([false, false, false, false]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);


  const { correoProfesor, nombreProfesor } = location.state || {};

  const handleName_testNameChange = (e) => {
    setName_test(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[index] = !newCorrectAnswers[index];
    setCorrectAnswers(newCorrectAnswers);
  };
  const handleCreate = async () => {
    if (name_test && question && choices.every((choice) => choice.trim() !== '')) {
      try {
        const response = await fetch('/agregar-cuestionario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name_test,
            id_teacher: correoProfesor,
            question,
            choices,
            correctAnswers,
          }),
        });

        if (response.ok) {
          const nuevoCuestionario = await response.json(); // Aquí obtenemos el nuevo cuestionario desde la base de datos
          console.log('Cuestionario agregado:', nuevoCuestionario);

          // Limpia los campos del formulario
          setName_test('');
          setQuestion('');
          setChoices(['', '', '', '']);
          setCorrectAnswers([false, false, false, false]);
        } else {
          // Manejar errores de solicitud, como autenticación o errores de servidor
          console.error('Error al crear el cuestionario.');
        }
      } catch (error) {
        console.error('Error de cuenta:', error);
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };
  const handleClose = () => {
    // Lógica para cerrar el popup
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <h3>Crear Cuestionario</h3>
        <form>
          <div className="input-container">
            <label>Nombre del test:</label>
            <input type="text" value={name_test} onChange={handleName_testNameChange} />
          </div>
          <div className="input-container">
            <label>Escriba la pregunta:</label>
            <input type="text" value={question} onChange={handleQuestionChange} />
          </div>
          {choices.map((choice, index) => (
            <div key={index} className="input-container">
              <label>Alternativa {index + 1}:</label>
              <input type="text" value={choice} onChange={(e) => handleChoiceChange(index, e)} />
              <input type="checkbox" checked={correctAnswers[index]} onChange={() => handleCorrectAnswerChange(index)} />
            </div>
          ))}
          <div className="button-container">
            <button type="button" onClick={handleCreate}>
              Crear Cuestionario
            </button>
            <button type="button" onClick={handleClose}>
              Cerrar
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearCuestionario;
