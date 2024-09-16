const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String},
},{timestamps: true})

module.exports = mongoose.model("staffs", StaffSchema);
