import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE } from "../mutation/MutationEmployee";

const EmployeeCreate = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    department: "",
    title: "",
    employeeType: "",
    dateOfJoining: "",
  });

  // State for error and success messages
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // useMutation hook to call the GraphQL mutation
  const [createEmployee, { loading, error }] = useMutation(CREATE_EMPLOYEE, {
    // Reset form and show success message once employee is created
    onCompleted: (data) => {
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        department: "",
        title: "",
        employeeType: "",
        dateOfJoining: "",
      });
      setErrorMsg(""); // Clear any error message
      setSuccessMsg("Employee added successfully!");
    },
    // Handle errors if the mutation fails
    onError: (error) => {
      setErrorMsg(`Failed to add employee. Error: ${error.message}`);
      console.error("Error adding employee:", error.message);
    },
  });

  // Show loading spinner while waiting for the mutation response
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  // Show error message if there's an error
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form data before submission
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) return "Name is required.";
    if (
      !formData.age ||
      parseInt(formData.age) < 20 ||
      parseInt(formData.age) > 70
    )
      return "Age must be between 20 and 70.";
    if (!formData.department) return "Department is required.";
    if (!formData.title) return "Title is required.";
    if (!formData.employeeType) return "Employee type is required.";
    if (!formData.dateOfJoining) return "Date of joining is required.";
    return "";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    // Prepare the input data for the mutation
    const input = {
      ...formData,
      age: parseInt(formData.age),
      dateOfJoining: new Date(formData.dateOfJoining).toISOString(),
    };
    console.log("Submitting Employee Input:", input);

    // Call the createEmployee mutation with the prepared input
    createEmployee({ variables: { input } }).catch(console.error);
  };

  return (
    <div
      className="container mt-4"
      style={{ paddingBottom: "184px", maxWidth: "800px" }}
    >
      <h3 className="text-center mb-4">Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <table className="table table-borderless mb-4 table-responsive">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="form-control"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="form-control"
                  required
                  min="1"
                />
              </td>
              <td>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {["IT", "Marketing", "HR", "Engineering"].map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>
                    Select Title
                  </option>
                  {["Employee", "Manager", "Director", "VP"].map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <select
                  name="employeeType"
                  value={formData.employeeType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>
                    Select Employee Type
                  </option>
                  <option value="Full-Time">Full-time</option>
                  <option value="Part-Time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  placeholder="Date of Joining"
                  className="form-control"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Employee"}
                </button>
              </td>
            </tr>
            {errorMsg && (
              <tr>
                <td colSpan="2">
                  <p className="text-danger text-center">{errorMsg}</p>
                </td>
              </tr>
            )}
            {successMsg && (
              <tr>
                <td colSpan="2">
                  <p className="text-success text-center">{successMsg}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EmployeeCreate;
