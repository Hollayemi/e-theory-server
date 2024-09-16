const mongoose = require('mongoose');

const CourseRegSchema = new mongoose.Schema({
    title: {type: String, required: true},
    code: {type: String, required: true},
    semester: {type: String, required: true},
    level: {type: String, required: true},
    students: {type: String},
    reg_no: {type: String},
},{timestamps: true})

module.exports = mongoose.model("courseReg", CourseRegSchema);
