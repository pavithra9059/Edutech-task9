const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    industry: String,
    location: String,
    foundedYear: Number
});

module.exports = mongoose.model("Company", CompanySchema);
