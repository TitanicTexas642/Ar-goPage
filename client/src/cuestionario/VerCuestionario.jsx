import React from 'react';

function VerCuestionario({ cuestionario, onBack }) {
  return (
    <div>
      <h2>Ver Cuestionario</h2>
      <button onClick={onBack}>Volver</button>
      <h3>Nombre del Cuestionario: {cuestionario.name_test}</h3>
      <ul>
        {cuestionario.questions.map((question, index) => (
          <li key={index}>
            <h4>Pregunta {index + 1}:</h4>
            <p>{question.question}</p>
            <h4>Alternativas:</h4>
            <ul>
              {question.choices.map((choice, choiceIndex) => (
                <li key={choiceIndex}>
                  {choice}
                  {question.correctAnswers[choiceIndex] && ' (Correcta)'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerCuestionario;
