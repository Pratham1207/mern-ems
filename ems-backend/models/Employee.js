const mongoose = require("mongoose");

// Define the Employee schema
const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, min: 20, max: 70, required: true },
  dateOfJoining: { type: Date, required: true },
  title: {
    type: String,
    enum: ["Employee", "Manager", "Director", "VP"],
    required: true,
  },
  department: {
    type: String,
    enum: ["IT", "Marketing", "HR", "Engineering"],
    required: true,
  },
  employeeType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Seasonal"],
    required: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
