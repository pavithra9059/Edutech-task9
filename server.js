const express = require("express");
const mongoose = require("mongoose");

const Company = require("./company");
const Department = require("./department");
const Employee = require("./employee");
const Project = require("./project");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BusinessDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// CREATE DATA
app.get("/setup", async (req, res) => {

    try {

        const company = await Company.create({
            companyName: "Tech Solutions Pvt Ltd",
            industry: "Software",
            location: "Hyderabad",
            foundedYear: 2020
        });

        const department = await Department.create({
            departmentName: "Development",
            companyId: company._id
        });

        const employee = await Employee.create({
            name: "Pavithra",
            email: "pavithra@gmail.com",
            designation: "Full Stack Developer",
            salary: 60000,
            departmentId: department._id
        });

        const project = await Project.create({
            projectName: "E-Commerce Website",
            client: "ABC Ltd",
            status: "In Progress",
            departmentId: department._id
        });

        res.json({
            message: "Data Inserted Successfully",
            company,
            department,
            employee,
            project
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


// READ ALL EMPLOYEES
app.get("/employees", async (req, res) => {

    const employees = await Employee.find()
        .populate("departmentId");

    res.json(employees);
});


// UPDATE EMPLOYEE
app.put("/employee/:id", async (req, res) => {

    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
            salary: req.body.salary
        },
        { new: true }
    );

    res.json(employee);
});


// DELETE EMPLOYEE
app.delete("/employee/:id", async (req, res) => {

    await Employee.findByIdAndDelete(req.params.id);

    res.json({
        message: "Employee Deleted"
    });
});


// COMPANY DETAILS WITH DEPARTMENTS
app.get("/companies", async (req, res) => {

    const companies = await Company.find();

    res.json(companies);
});


// PROJECTS
app.get("/projects", async (req, res) => {

    const projects = await Project.find()
        .populate("departmentId");

    res.json(projects);
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
