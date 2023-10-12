const Profesor = require('../schema/teacher'); // Asegúrate de importar tu modelo de profesor
const

// Función para autenticar al profesor usando MongoDB
async function autenticarProfesor(email, password) {
  try {
    // Buscar al profesor por correo electrónico en la base de datos
    const profesor = await Profesor.findOne({ email });

    if (!profesor) {
      return false; // El profesor no existe
    }

    // Verificar la contraseña (debes usar una biblioteca de hash de contraseñas, como bcrypt)
    // En este ejemplo, asumimos que la contraseña se almacena sin cifrar (no es seguro en producción)
    if (profesor.password === password) {
      return true; // Autenticación exitosa
    }

    return false; // Contraseña incorrecta
  } catch (error) {
    console.error('Error al autenticar al profesor:', error);
    throw error; // Manejo de errores
  }
}

module.exports = {
    autenticarProfesor
  };
  