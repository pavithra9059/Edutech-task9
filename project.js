const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    client: String,
    status: String,
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
});

module.exports = mongoose.model("Project", ProjectSchema);
