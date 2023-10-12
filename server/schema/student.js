const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name_student: String,
    course: String,
    rut: String,
    id_teacher: String
});

const Student = mongoose.model("student",StudentSchema);

module.exports = Student;