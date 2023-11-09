const mongoose = require('mongoose')

const CuestionarioSchema = new mongoose.Schema({
    name_test: String,
    id_teacher: String,
    questions: [
      {
        question: String,
        choices: [String],
        correctAnswers: [Boolean],
      },
    ],
  });

const Cuestionario = mongoose.model("cuestionarios",CuestionarioSchema);

module.exports = Cuestionario;