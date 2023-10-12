const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: String,
  password:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema); // Aquí cambiamos "teacher" por "Teacher"

module.exports = Teacher;
