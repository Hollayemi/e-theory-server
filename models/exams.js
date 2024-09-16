const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    lecturerId: {type: String, required: true},
    course_title: {type: String, required: true},
    exam_code: {type: String, required: false},
    course_code: {type: String, required: true},
    question: {type: String, required: true},
    ans: {type: String, required: true},
    keyword: {type: Array},
    start: {type: Boolean, default: false},
},{timestamps: true})

module.exports = mongoose.model("exams", ExamSchema);
