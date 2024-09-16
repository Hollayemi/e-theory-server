const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    regNo: {type: String, required: true},
    token: {type: String},
},{timestamps: true})

module.exports = mongoose.model("students", StudentSchema);
