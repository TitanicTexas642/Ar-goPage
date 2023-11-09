import React, { useState, useEffect } from 'react';

function EditarCuestionario({ cuestionarioEditado, onClose, onSave }) {
  const [cuestionario, setCuestionario] = useState(cuestionarioEditado || { name_test: '', questions: [] });
  const [error, setError] = useState(null);

  const handleName_testChange = (e) => {
    setCuestionario({ ...cuestionario, name_test: e.target.value });
  };

  const handleAddQuestion = () => {
    const newQuestion = { question: '', choices: ['', '', '', ''], correctAnswers: [false, false, false, false] };
    setCuestionario({ ...cuestionario, questions: [...cuestionario.questions, newQuestion] });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...cuestionario.questions];
    updatedQuestions[index].question = e.target.value;
    setCuestionario({ ...cuestionario, questions: updatedQuestions });
  };

  const handleChoiceChange = (questionIndex, choiceIndex, e) => {
    const updatedQuestions = [...cuestionario.questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = e.target.value;
    setCuestionario({ ...cuestionario, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...cuestionario.questions];
    updatedQuestions[questionIndex].correctAnswers[choiceIndex] = !updatedQuestions[questionIndex].correctAnswers[choiceIndex];
    setCuestionario({ ...cuestionario, questions: updatedQuestions });
  };

  const handleSave = () => {
    fetch(`/cuestionarios/${cuestionarioEditado._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuestionario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(() => {
        setError(null);
        onClose();
        onSave(cuestionario); // Pasa el cuestionario actualizado de regreso al componente padre
      })
      .catch((error) => {
        setError(error.message || 'Error al guardar los cambios');
      });
  };

  return (
    <div className="modal" style={{ display: 'block', overflowY: 'auto', maxHeight: '80vh' }}>
      <div className="modal-content">
        <h3>Editar Cuestionario</h3>
        <form>
          <div className="input-container">
            <label>Nombre del Test: </label>
            <input
              type="text"
              value={cuestionario.name_test}
              onChange={handleName_testChange}
            />
          </div>
          {cuestionario.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div className="input-container">
                <label>Pregunta {questionIndex + 1}:</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                />
              </div>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="input-container">
                  <label>Alternativa {choiceIndex + 1}:</label>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e)}
                  />
                  <input
                    type="checkbox"
                    checked={question.correctAnswers[choiceIndex]}
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
            <button type="button" onClick={handleSave}>
              Guardar Cambios
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarCuestionario;
