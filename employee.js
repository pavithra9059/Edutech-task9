const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    designation: String,
    salary: Number,
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
