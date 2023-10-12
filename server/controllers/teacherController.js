const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');

// Controlador para crear un nuevo profesor
const crearProfesor = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const nuevoProfesor = new Teacher({ name, password, email });
    await nuevoProfesor.save();
    res.json({ message: 'Profesor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el profesor' });
  }
};

// Controlador para obtener todos los profesores
const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Teacher.find();
    res.json(profesores);
  } catch (error) {
    console.error("Error detallado:", error);
  }
};

// Controlador para actualizar un profesor existente
const actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await Teacher.findByIdAndUpdate(id, { password });
    res.json({ message: 'Profesor actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
};

// Controlador para eliminar un profesor
const eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.json({ message: 'Profesor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
};

const obtenerDatosProfesorPorCorreo = async (req, res) => {
  try {
    const { email } = req.params;
    const profesor = await obtenerProfesorPorCorreo(email);
    if (profesor) {
      const { name, password, _id } = profesor;
      res.json({ name, password, id: _id });
    } else {
      res.status(404).json({ error: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del profesor' });
  }
};


// Controlador para obtener un profesor por correo electrónico
const obtenerProfesorPorCorreo = async (email) => {
  try {
    const profesor = await Teacher.findOne({ email });
    return profesor;
  } catch (error) {
    throw new Error('Error al obtener el profesor por correo electrónico');
  }
};


module.exports = {
  crearProfesor,
  obtenerProfesores,
  actualizarProfesor,
  eliminarProfesor,
  obtenerDatosProfesorPorCorreo, // Agregamos la nueva función al export
};