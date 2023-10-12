const mongoose = require('mongoose');
const Student = mongoose.model('student');

// Controlador para crear un nuevo estudiante
const crearStudent = async (req, res) => {
  try {
    const { name_student, course, id_teacher, rut } = req.body;
    const newStudent = new Student({ name_student,course,id_teacher, rut });
    await newStudent.save();
    res.json({ message: 'Alumno creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
};

// Controlador para obtener todos los estudiantes
const obtenerStudent = async (req, res) => {
  try {
    const students = await Student.find(); // Assuming Student is the model you're using
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
};


// Controlador para actualizar un estudiante existente
const actualizarStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { course } = req.body;
    await Student.findByIdAndUpdate(id, { course });
    res.json({ message: 'Estudiante actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

// Controlador para eliminar un estudiante
const eliminarStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Estudiante eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};

module.exports = {
    crearStudent,
    obtenerStudent,
    actualizarStudent,
    eliminarStudent
};