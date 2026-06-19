const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
});

module.exports = mongoose.model("Department", DepartmentSchema);
