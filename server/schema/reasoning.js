const mongoose = require('mongoose')

const ReasoningSchema = new mongoose.Schema({
    name_student: String,
    id_student: String, 
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String,
    p7: String,
    p8: String,
    p9: String
})


mongoose.model("reasoning",ReasoningSchema)