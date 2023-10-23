const mongoose = require('mongoose')

const CuestionariosSchema = new mongoose.Schema({
    name_test : String,
    id_teacher : String,
    question : String,
    choices: [String],
    correctAnswers: [Boolean],
});

const Cuestionario = mongoose.model("cuestionarios",CuestionariosSchema);

module.exports = Cuestionario;