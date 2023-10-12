const mongoose = require('mongoose');
const Reasoning = mongoose.model('reasoning');

// Controlador para guardar resultados de la prueba de razonamiento
const guardarReasoning = async (req, res) => {
  try {
    const { name_student, id_student, p1, p2, p3, p4, p5, p6, p7, p8, p9 } = req.body;
    const newStudent = new Reasoning({ name_student, id_student, p1, p2, p3, p4, p5, p6, p7, p8, p9  });
    await newStudent.save();
    res.json({ message: 'resultados guardados exitosamente de la prueba de razonamiento' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar resultados de la prueba de razonamiento' });
  }
};

// Controlador para obtener todos los resultados
const obtenerReasoning = async (req, res) => {
  try {
    const test = await Reasoning.find();
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los resultados de la prueba de razonamiento' });
  }
};


// Controlador para eliminar resultados
const eliminarReasoning = async (req, res) => {
  try {
    const { id } = req.params;
    await Reasoning.findByIdAndDelete(id);
    res.json({ message: 'Test de razonamiento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el test de razonamiento' });
  }
};

module.exports = {
    guardarReasoning,
    obtenerReasoning,
    eliminarReasoning
};