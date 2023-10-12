const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    id_teacher: String,
    id_student:String,
    matrices:String,
    balanza:String,
    aritmetica:String,
    cubos:String,
    informacion:String,
    semejanzas:String,
    puzzles:String,
    letras_numeros:String,
    id_student_rial:String,
    claves:String,
    cancelacion:String,
    vocabulario:String,
})


const Test = mongoose.model("tests",TestSchema);

module.exports = Test;
