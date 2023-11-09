import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CrearCuestionario({ onClose }) {
  const [name_test, setName_test] = useState('');
  const [questions, setQuestions] = useState([{ question: '', choices: ['', '', '', ''], correctAnswers: [false, false, false, false] }]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const { correoProfesor, nombreProfesor } = location.state || {};

  const handleName_testNameChange = (e) => {
    setName_test(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswers[choiceIndex] = !newQuestions[questionIndex].correctAnswers[choiceIndex];
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', '', '', ''], correctAnswers: [false, false, false, false] }]);
  };

  const handleCreate = async () => {
    if (name_test && questions.every((q) => q.question && q.choices.every((choice) => choice.trim() !== ''))) {
      try {
        const response = await fetch('/agregar-cuestionario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name_test,
            id_teacher: correoProfesor,
            questions,
          }),
        });

        if (response.ok) {
          const nuevoCuestionario = await response.json();
          console.log('Cuestionario agregado:', nuevoCuestionario);

          setName_test('');
          setQuestions([{ question: '', choices: ['', '', '', ''], correctAnswers: [false, false, false, false] }]);
        } else {
          console.error('Error al crear el cuestionario.');
        }
      } catch (error) {
        console.error('Error de cuenta:', error);
      }
    } else {
      alert('Por favor, complete todos los campos en todas las preguntas.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block', overflowY: 'auto', maxHeight: '80vh' }}>
      <div className="modal-content">
        <h3>Crear Cuestionario</h3>
        <form>
          <div className="input-container">
            <label>Nombre del test:</label>
            <input type="text" value={name_test} onChange={handleName_testNameChange} />
          </div>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex}>
              <div className="input-container">
                <label>Pregunta {questionIndex + 1}:</label>
                <input type="text" value={q.question} onChange={(e) => handleQuestionChange(questionIndex, e)} />
              </div>
              {q.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="input-container">
                  <label>Alternativa {choiceIndex + 1}:</label>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e)}
                  />
                  <input
                    type="checkbox"
                    checked={q.correctAnswers[choiceIndex]}
                    onChange={() => handleCorrectAnswerChange(questionIndex, choiceIndex)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Agregar Pregunta
          </button>
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

