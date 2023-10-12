const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
require('./schema/teacher')
require('./schema/student')
require('./schema/reasoning')
require('./schema/test')

// Importa los controladores
const teacherController = require('./controllers/teacherController');
const studentController = require('./controllers/studentController');
const reasoningController = require('./controllers/reasoningController');

const Teacher = require('./schema/teacher')
const Student = require('./schema/student')
const Test = require('./schema/test')
const mongoUri= "mongodb+srv://jaime18:5LNifiVmya4G8FnF@cluster1.yndbs1l.mongodb.net/?retryWrites=true&w=majority"

//login
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
//sesiones 
app.use(session({
    secret:'some secret',
    cookie: {maxAge:30000},
    saveUnitialized: false,
}))



app.use(express.static(path.join(__dirname,'views')));
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})

app.post('/login', async (req, res) => {
    // Obtén el correo electrónico del usuario
    req.headers['Content-Type'] = 'application/json';
    const email = req.body.email;

    // Busca al usuario en la base de datos
    const user = await Teacher.findOne({ email });

    // Si el usuario no existe, devuelve un mensaje de error
    if (!user) {
        res.send("El usuario no existe");
        return;
    }

    // Obtén la contraseña del usuario (en este ejemplo, suponemos que se almacena en texto plano)
    const password = user.password;
    const name = user.name;
    const id = user._id;
    console.log(name);
    console.log('hola');
    console.log(id);
    console.log('Valor del _id:', user._id.toString());
    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos (en texto plano)
    if (req.body.password === password) {
      // Inicia sesión al usuario
        // Devuelve una página HTML con el nombre del usuario en la URL
        //const htmlResponse = template.replace('{{name}}', name);
        //res.send(htmlResponse);
        res.send(JSON.stringify(name));
    } else {
        res.send("La contraseña es incorrecta");
    }
});

app.post('/agregar-estudiante',async (req,res) => {
    try{
        const {name_student,id_teacher,course,rut} = req.body;
        const estudiante = new Student({ name_student, id_teacher, course, rut });
        const estudianteguardado = await estudiante.save();
        const estudianteTest = new Test({
          id_teacher,
          id_student:rut,
          matrices: '1',
          balanza: '1',
          aritmetica: '1',
          cubos: '1',
          informacion: '1',
          semejanzas: '1',
          puzzles: '1',
          letras_numeros: '1',
          id_student_rial:estudiante._id.toString(),
        });
        const estudianteTestguardado = await estudianteTest.save();
        res.status(201).json({ estudiante:estudianteguardado, estudianteTest: estudianteTestguardado});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el estudiante' });
        console.error('Error al agregar el estudiante:', error);
      }
});

app.get('/estudiantes', async (req, res) => {
    // Ruta para recuperar estudiantes por ID de profesor
    const profesorCorreo = req.query.profesorCorreo;
  
    try {
      // Consulta la base de datos para recuperar estudiantes relacionados con el profesor
      const estudiantes = await Student.find({ id_teacher: profesorCorreo });
  
      res.json(estudiantes);
    } catch (error) {
      console.error('Error al recuperar estudiantes:', error);
      console.log(error)
      res.status(500).json({ error: 'Error al recuperar estudiantes' });
    }
});

app.put('/estudiantes/:id', async (req, res) => {
  const estudianteId = req.params.id;
  const updatedEstudiante = req.body; // Datos actualizados del estudiante

  try {
    // Encuentra el estudiante por su ID y actualízalo en la base de datos
    const estudiante = await Student.findByIdAndUpdate(estudianteId, updatedEstudiante, { new: true });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json({ message: 'Estudiante actualizado con éxito', estudiante });
  } catch (error) {
    console.error('Error al actualizar el estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/pruebas',async (req,res) =>{
    try {
        const rutEstudiante= req.query.rutEstudiante;
    
        // Realiza la lógica para obtener las pruebas relacionadas con el estudiante desde la base de datos
        // Esto puede variar dependiendo de tu base de datos y modelo de datos
    
        // Supongamos que tienes una función `obtenerPruebasDeEstudiante` que devuelve las pruebas relacionadas con el estudiante
        const pruebas = await Test.find({id_student:rutEstudiante});
    
        // Envía la lista de pruebas como respuesta
        res.status(200).json(pruebas);
      } catch (error) {
        console.error('Error al obtener las pruebas del estudiante:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener las pruebas del estudiante' });
      }
});

app.patch('/actualizar-propiedad/:pruebaId', async (req, res) => {
  try {
    const { propiedad, nuevoValor } = req.body;
    const pruebaId = req.params.pruebaId;

    // Encuentra la prueba por su ID
    const prueba = await Test.findById(pruebaId);

    if (!prueba) {
      return res.status(404).json({ error: 'Prueba no encontrada' });
    }

    // Actualiza la propiedad específica con el nuevo valor
    prueba[propiedad] = nuevoValor;

    // Guarda la prueba actualizada en la base de datos
    await prueba.save();
    console.log(prueba);
    console.log(pruebaId);
    console.log(prueba[propiedad]);
    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Propiedad actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la propiedad:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la propiedad' });
  }
});

app.post('/profesores', teacherController.crearProfesor);
app.get('/profesores', teacherController.obtenerProfesores);
app.put('/profesores/:id', teacherController.actualizarProfesor);
app.delete('/profesores/:id', teacherController.eliminarProfesor);
app.get('/profesor',teacherController.obtenerDatosProfesorPorCorreo);
app.post('/profesor',teacherController.obtenerDatosProfesorPorCorreo);
// Rutas para el modelo Reasoning
app.post('/razonamiento', reasoningController.guardarReasoning);
app.get('/razonamiento', reasoningController.obtenerReasoning);
app.delete('/razonamiento/:id', reasoningController.eliminarReasoning);

// Rutas para el modelo Student
app.post('/estudiantes', studentController.crearStudent);
app.get('/estudiantes', studentController.obtenerStudent);
app.put('/estudiantes/:id', studentController.actualizarStudent);
app.delete('/estudiantes/:id', studentController.eliminarStudent);

app.listen(5000,()=>{
    console.log("server running")
})
