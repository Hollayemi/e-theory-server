const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    course_code: {type: String, required: true},
    answers: {type: Object, required: true},
    score: {type: Number},
    level: {type: String},
    regNo: {type: String, required: true},
    studentId: {type: String,  required: true},
},{timestamps: true})

module.exports = mongoose.model("results", AnswerSchema);
